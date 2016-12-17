function Universal(id, options) {
  const VENDER = 'Universal';
  const LOADING = 'loading';
  const PROGRESS = 'progress';
  const LOADED = 'loaded';
  const FAILED = 'failed';
  const EXTRACTOR_STATE_CHANGE = 'EXTRACTOR_STATE_CHANGE';

  function Extractor(id, options) {
    this.id = id;
    this.options = Object.assign({}, Extractor.defaults, options);
    this.origin = `chrome-extension://${this.id}`;
    this.ref = document.getElementById(this.id);
    this.vender = VENDER;
    this.state = LOADING;
    this.post({
      type: EXTRACTOR_STATE_CHANGE,
      state: PROGRESS,
    });
    this.images = [];
    this.state = PROGRESS;

    this.onTimeout = this.onTimeout.bind(this);

    if (this.options.timeout > 0) {
      this.timer = setTimeout(this.onTimeout, this.options.timeout);
    } else {
      this.timer = null;
    }

    for (let image of document.images) {
      if (this.options.minWidth && image.width < this.options.minImageWidth) {
        continue;
      }
      if (this.options.minHeight && image.height < this.options.minImageHeight) {
        continue;
      }
      if (image.src) {
        this.images.push(image.src);
      } else if (image.dataset.original) {
        this.images.push(image.dataset.original);
      }
    }

    if (this.images.length) {
      this.onLoad({
        title: document.title,
        pages: this.images.slice(),
      });
    } else {
      this.onError();
    }
  }

  Extractor.prototype.post = function(message) {
    if (this.ref && this.ref.contentWindow) {
      this.ref.contentWindow.postMessage(Object.assign({}, message, { id: this.id }), this.origin);
    }
  }

  Extractor.prototype.onTimeout = function() {
    if (this.state === PROGRESS) {
      this.state = TIMEOUT;
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: TIMEOUT,
      });
    }
  }

  Extractor.prototype.onLoad = function(ret) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS || this.state === TIMEOUT) {
      this.state = LOADED;
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        payload: Object.assign({}, ret, { vender: this.vender, url: document.location.href }),
        state: LOADED,
      });
    }
  }

  Extractor.prototype.onError = function(err) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS) {
      this.state = FAILED;
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: FAILED,
      });
    }
  }

  Extractor.defaults = {
    timeout: 10000,
    minImageWidth: 500,
    minImageHeight: 300
  }

  this.vender = VENDER;

  return new Extractor(id, options || {});
}

export default Universal;