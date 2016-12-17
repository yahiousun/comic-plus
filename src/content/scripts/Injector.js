class Injector {
  constructor(func) {
    if (typeof func === 'function') {
      this.textContent = `(${func})(${this.serialize(Array.prototype.slice.call(arguments, 1))})`;
    } else {
      this.textContent = func;
    }
    this.ref = document.createElement('script');
    this.ref.textContent = this.textContent;
    document.body.appendChild(this.ref);
    this.ref.parentNode.removeChild(this.ref);
  }
  serialize(params) {
    const paramsTextArray = [];
    if (!params.length) {
      return '';
    }
    for (let param of params) {
      switch (typeof param) {
        case 'string': {
          paramsTextArray.push('\'' + param + '\'');
          break;
        }
        case 'number': {
          paramsTextArray.push('\'' + param + '\'');
          break;
        }
        case 'object': {
          paramsTextArray.push(JSON.stringify(param));
          break;
        }
        default: {
          throw new TypeError(`Unsupported parameter type ${typeof param}`);
        }
      }
    }
    return paramsTextArray.join(',');
  }
}
export default Injector;
