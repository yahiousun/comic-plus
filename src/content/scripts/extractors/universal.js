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
    this.data = {
      title: document.title,
      pages: [],
    };
    this.state = PROGRESS;

    this.onTimeout = this.onTimeout.bind(this);

    if (this.options.timeout > 0) {
      this.timer = setTimeout(this.onTimeout, this.options.timeout);
    } else {
      this.timer = null;
    }

    for (let image of document.images) {
      if (this.options.minImageWidth && image.width < this.options.minImageWidth && (!image.dataset.original || !image.dataset.src)) {
        continue;
      }
      if (this.options.minImageWidth && image.height < this.options.minImageHeight && (!image.dataset.original || !image.dataset.src)) {
        continue;
      }
      let imageSrc = '';
      if (image.dataset.original) {
        imageSrc = image.dataset.original;
      } else if (image.dataset.src) {
        imageSrc = image.dataset.src;
      } else if (image.src) {
        imageSrc = image.src;
      }
      if (imageSrc) {
        if (/^(http:|https:)/.test(imageSrc)) {
          this.data.pages.push(imageSrc);
        } else {
          this.data.pages.push(`${window.location.protocol}${imageSrc}`);
        }
      }
    }

    if (this.data.pages.length) {
      this.onLoad(this.data);
    } else {
      this.onError('Data Not Found');
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
        error: err,
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