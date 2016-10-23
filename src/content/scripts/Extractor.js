import Injector from './Injector';
import * as extractors from './extractors';
import SITES from './sites';

class Extractor {
    get vender() {
        return this.extractor.vender;
    }
    constructor(id, options) {
        this.id = id;
        this.options = Object.assign({}, options);
        this.find();
        this.inject();
    }
    find() {
        let match, url = document.location.href;

        for (let site of Object.keys(SITES)) {
            if (SITES[site].test(url)) {
                match = site;
                this.extractor = extractors[match];
                break;
            }
        }
        console.log(match)
        if (!match) {
            this.extractor = extractors.Universal;
        }
    }
    inject() {
        this.injection = new Injector(this.extractor, this.id, this.options);
    }
}

export default Extractor;