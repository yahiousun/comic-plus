class Injector {
    constructor(func) {
        if (typeof func === 'function') {
            this.textContent = '(' + func + ')()';
        }
        else {
            this.textContent = func;
        }
        this.ref = document.createElement('script');
        this.ref.textContent = this.textContent;
        this.inject();
    }
    inject() {
        document.body.appendChild(this.ref);
        //this.ref.parentNode.removeChild(this.ref);
    }
}
export default Injector;
