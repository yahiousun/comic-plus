function Universal(options) {

    const LOADING = 'loading';
    const PROGRESS = 'progress';
    const LOADED = 'loaded';
    const FAILED = 'failed';

    const RESOURCE_LOAD = 'RESOURCE_LOAD';
    const RESOURCE_TIMEOUT = 'RESOURCE_TIMEOUT';
    const RESOURCE_ERROR = 'RESOURCE_ERROR';

    function Extractor(id, options) {
        let self = this;
        self.id = id;
        self.options = Object.assign({}, Extractor.defaults, options);
        self.origin = 'chrome-extension://' + self.id;
        self.ref = document.getElementById(self.id);
        self.vender = 'Universal';
        self.status = LOADING;
        self.extract();
    }

    Extractor.prototype.extract = function(msg) {
        let self = this;
        let images = [];
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
            images.push(img.src);
        }

        if (images.length) {
            self.onLoad({
                title: document.title,
                images: images.slice()
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
                type: RESOURCE_TIMEOUT,
            })
        }
    }

    Extractor.prototype.onLoad = function(ret) {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: RESOURCE_LOAD,
                payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href })
            })
        }
    }

    Extractor.prototype.onError = function(err) {
        if (self.status === PROGRESS) {
            self.post({
                type: RESOURCE_ERROR,
                code: err || 10001
            })
        }
    }

    Extractor.defaults = {
        timeout: 10000,
        minWidth: 0,
        minHeight: 0
    }

    return new Extractor(options);
}

Universal.vender = 'Universal';

export default Universal;