import Bridge from './Bridge';
import { LOADED, PROGRESS, FAILED, LOADING, TIMEOUT, IMAGE_LOAD, IMAGE_ERROR, IMAGE_PROGRESS } from './constants';

class Downloader {
    constructor(src) {
        this.__onLoad__ = this.onLoad.bind(this);
        this.__onError__ = this.onError.bind(this);
        this.state = LOADING;
        this.src = src;
        this.ref = document.createElement('img');
        this.ref.addEventListener('load', this.__onLoad__, false);
        this.ref.addEventListener('errer', this.__onError__, false);
        this.state = PROGRESS;
        this.bridge = new Bridge();
        this.bridge.send({
            type: IMAGE_PROGRESS,
            payload: this.src
        });
        this.ref.src = this.src;
        this.timer = setTimeout(this.onTimeout.bind(this), 10000)
    }
    onTimeout() {
        this.state = TIMEOUT;
        this.bridge.send({
            type: IMAGE_TIMEOUT,
            payload: this.src
        })
    }
    onLoad() {
        clearTimeout(this.timer);
        this.state = LOADED;
        this.bridge.send({
            type: IMAGE_LOAD,
            payload: this.src
        })
    }
    onError() {
        clearTimeout(this.timer);
        this.state = FAILED;
        this.bridge.send({
            type: IMAGE_ERROR,
            payload: this.src
        })
    }
}

export default Downloader;