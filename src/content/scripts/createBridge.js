import * as extractors from './extractors';
import { SITES } from './constants';

export default () => {
    let url = window.location.href, match, extractor;

    for (let key of Object.keys(SITES)) {
        if (SITES[key].test(url)) {
            match = key;
            break;
        }
    }

    if (match) {
        extractor = extractors[match];
    }
    else {
        extractor = extractor.universal;
    }

    // let injectFunc = (() => {
    //     var _extractor = extractor
    // });
}