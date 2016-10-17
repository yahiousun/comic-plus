import Bridge from './Bridge';
import { LOADED, PENDING, FAILED, LOADING, DOWNLOAD, ERROR } from './constants';

class Downloader {
    constructor(src) {
        this.__onLoad__ = this.onLoad.bind(this);
        this.__onError__ = this.onError.bind(this);
        this.state = LOADING;
        this.src = src;
        this.ref = document.createElement('img');
        this.ref.addEventListener('load', this.__onLoad__, false);
        this.ref.addEventListener('errer', this.__onError__, false);
        this.state = PENDING;
        this.target;
        this.bridge = new Bridge();
        this.ref.src = this.src;
    }
    onLoad() {
        this.state = LOADED;
        this.bridge.send({
            type: DOWNLOAD,
            payload: this.src
        })
    }
    onError() {
        this.state = FAILED;
        this.bridge.send({
            type: ERROR,
            payload: this.src
        })
    }
}

export default Downloader;