function Universal(options) {

    const LOADING = 'loading';
    const PENDING = 'pending';
    const LOADED = 'loaded';
    const FAILED = 'failed';
    const ERROR = 'error';
    const INITIALIZE = 'initialize';

    function Extractor(id, options) {
        let self = this;
        self.id = id;
        self.options = Object.assign({}, Extractor.defaults, options);
        self.origin = 'chrome-extension://' + self.id;
        self.ref = document.getElementById(self.id);
        self.vender = 'Universal';
        self.state = LOADING;
        self.extract();
    }

    Extractor.prototype.extract = function(msg) {
        let self = this;
        let images = [];
        if (self.state !== LOADING) {
            return;
        }
        self.state = PENDING;

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
        if (self.ref && self.contentWindow) {
            self.ref.contentWindow.postMessage(Object.assign({}, msg, self.options.id), self.origin);
        }
    }

    Extractor.prototype.bindTimeout = function() {
        let self = this;
        setTimeout(self.onTimeout.bind(self), self.timeout);
    }

    Extractor.prototype.onTimeout = function() {
        let self = this;
        if (self.state === PENDING) {
            self.post({
                type: ERROR,
                code: -1
            })
        }
    }

    Extractor.prototype.onLoad = function(ret) {
        let self = this;
        if (self.state === PENDING) {
            self.post({
                type: INITIALIZE,
                payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href })
            })
        }
    }

    Extractor.prototype.onError = function(err) {
        if (self.state === PENDING) {
            self.post({
                type: ERROR,
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