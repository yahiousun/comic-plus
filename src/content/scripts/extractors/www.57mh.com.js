function Www57mhCom(id, options) {
  const VENDER = 'www.57mh.com';
  const LOADING = 'loading';
  const PROGRESS = 'progress';
  const LOADED = 'loaded';
  const FAILED = 'failed';
  const EXTRACTOR_STATE_CHANGE = 'EXTRACTOR_STATE_CHANGE';

  function Extractor(id, options) {
    const BASE_URL = `${window.location.protocol}//${window.location.host}`;

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

    this.state = PROGRESS;

    this.onTimeout = this.onTimeout.bind(this);

    if (this.options.timeout > 0) {
      this.timer = setTimeout(this.onTimeout, this.options.timeout);
    } else {
      this.timer = null;
    }

    function getHost() {
      let host;
      if (window.pageConfig.host.auto.length) {
        host = window.pageConfig.host.auto[0];
      } else {
        for (let hosts of window.pageConfig.host) {
          if (hosts.length) {
            host = hosts[0];
            break;
          }
        }
      }
      return `${location.protocol}//${host}/`;
    }

    if (window.pageConfig && window.cInfo) {
      this.data = {
        title: `${window.cInfo.btitle} ${window.cInfo.ctitle}`,
        pages: window.cInfo.fs.slice().map(item => {
          return `${getHost()}${item}`;
        }),
        url: window.location.href,
      }
      if (window.cInfo.ncid) {
        Object.assign(this.data, {
          next: {
            url: `${BASE_URL}${window.cInfo.ncid}.html`,
          },
        });
      }
      if (window.cInfo.pcid) {
        Object.assign(this.data, {
          previous: {
            url: `${BASE_URL}${window.cInfo.pcid}.html`,
          },
        });
      }
      this.onLoad(this.data);
    } else {
      this.onError('No data found');
    }
  }

  Extractor.prototype.post = function(message) {
    if (this.ref && this.ref.contentWindow) {
      this.ref.contentWindow.postMessage(Object.assign({}, message, { id: this.id }), this.origin);
    }
  }

  Extractor.prototype.onTimeout = function() {
    if (this.state === PROGRESS) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: TIMEOUT,
      })
    }
  }

  Extractor.prototype.onLoad = function(ret) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS || this.state === TIMEOUT) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href }),
        state: LOADED,
      })
    }
  }

  Extractor.prototype.onError = function(err) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: FAILED,
        error: err,
      });
    }
  }

  Extractor.defaults = {
    timeout: 10000,
  }

  this.vender = VENDER;

  return new Extractor(id, options || {});
}

export default Www57mhCom;
