class Injector {
    constructor(func) {
        this.textContent = '(' + func + ')()';
        this.ref = document.createElement('script');
        this.ref.textContent = this.textContent;
        this.inject();
    }
    inject() {
        document.body.appendChild(this.ref);
        this.ref.parentNode.removeChild(this.ref);
    }
}
export default Injector;
