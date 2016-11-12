function Universal(options) {

    const LOADING = 'loading';
    const PROGRESS = 'progress';
    const LOADED = 'loaded';
    const FAILED = 'failed';

    const EXTRACT_STATE_CHANGE = 'EXTRACT_STATE_CHANGE';

    function Extractor(id, options) {
        let self = this;
        self.id = id;
        self.options = Object.assign({}, Extractor.defaults, options);
        self.origin = 'chrome-extension://' + self.id;
        self.ref = document.getElementById(self.id);
        self.vender = 'Universal';
        self.status = LOADING;
        self.post({
            type: EXTRACT_STATE_CHANGE,
            status: PROGRESS
        });
        self.extract();
    }

    Extractor.prototype.extract = function(msg) {
        let self = this;
        let pages = [];
        if (self.status !== LOADING) {
            return;
        }
        self.status = PROGRESS;

        for (let img of document.images) {
            if (!img.src) {
                continue;
            }
            if (self.options.minWidth && img.width < self.options.minWidth) {
                continue;
            }
            if (self.options.minHeight && img.height < self.options.minHeight) {
                continue;
            }
            pages.push(img.src);
        }

        if (pages.length) {
            self.onLoad({
                title: document.title,
                pages: pages.slice()
            })
        }
        else {
            self.onError()
        }
    }

    Extractor.prototype.post = function(msg) {
        let self = this;
        if (self.ref && self.ref.contentWindow) {
            self.ref.contentWindow.postMessage(Object.assign({}, msg, {id: self.id}), self.origin);
        }
    }

    Extractor.prototype.bindTimeout = function() {
        let self = this;
        setTimeout(self.onTimeout.bind(self), self.timeout);
    }

    Extractor.prototype.onTimeout = function() {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: EXTRACT_STATE_CHANGE,
                status: TIMEOUT
            })
        }
    }

    Extractor.prototype.onLoad = function(ret) {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: EXTRACT_STATE_CHANGE,
                payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href }),
                status: LOADED
            })
        }
    }

    Extractor.prototype.onError = function(err) {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: EXTRACT_STATE_CHANGE,
                status: ERROR
            })
        }
    }

    Extractor.defaults = {
        timeout: 10000,
        minWidth: 500,
        minHeight: 300
    }

    return new Extractor(options);
}

Universal.vender = 'Universal';

export default Universal;