export default class Injector {
    constructor(textContent) {
        this._extractor = document.createElement('script');
        this._extractor.textContent = textContent;
        document.head.appendChild(this._extractor);
        this._extractor.parentNode.removeChild(this._extractor);
    }
}