class Injector {
    constructor(func) {
        if (typeof func === 'function') {
            this.textContent = '(' + func + ')(' + this.serialize(Array.prototype.slice.call(arguments, 1)) + ')';
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
        this.ref.parentNode.removeChild(this.ref);
    }
    serialize(params) {
        let paramsTextArray = [];
        if (!params.length) {
            return '';
        }
        for (let param of params) {
            switch (typeof param) {
                case 'string': {
                    paramsTextArray.push('\'' + param + '\'');
                    break;
                }
                case 'function': {
                    paramsTextArray.push(param.toString());
                    break;
                }
                case 'object': {
                    paramsTextArray.push(JSON.stringify(param));
                    break;
                }
            }
        }
        return paramsTextArray.join(',');
    }
}
export default Injector;