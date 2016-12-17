import Bridge from './Bridge';
import { LOADED, PROGRESS, FAILED, LOADING, TIMEOUT, DOWNLOAD_STATE_CHANGE } from './constants';

class Downloader {
  get defaults() {
    return {
      timeout: 10000,
    }
  }
  constructor(src, options) {
    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
    this.state = LOADING;
    this.src = src;
    this.options = Object.assign({}, this.defaults, options);
    this.ref = document.createElement('img');
    this.ref.addEventListener('load', this.onLoad, false);
    this.ref.addEventListener('errer', this.onError, false);
    this.state = PROGRESS;
    this.bridge = new Bridge();
    this.bridge.send({
      type: DOWNLOAD_STATE_CHANGE,
      payload: this.src,
      state: PROGRESS,
    });

    if (this.options.timeout > 0) {
      this.timer = setTimeout(this.onTimeout.bind(this), this.options.timeout);
    } else {
      this.timer = null;
    }
    this.ref.src = this.src;
  }
  onTimeout() {
    if (this.state === PROGRESS) {
      this.state = TIMEOUT;
      this.bridge.send({
        type: DOWNLOAD_STATE_CHANGE,
        payload: this.src,
        state: TIMEOUT,
      });
    }
  }
  onLoad() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS || this.state === TIMEOUT) {
      this.state = LOADED;
      this.bridge.send({
        type: DOWNLOAD_STATE_CHANGE,
        payload: this.src,
        state: LOADED,
      });
    }
  }
  onError() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS) {
      this.state = FAILED;
      this.bridge.send({
        type: DOWNLOAD_STATE_CHANGE,
        payload: this.src,
        state: FAILED,
      });
    }
  }
}

export default Downloader;
