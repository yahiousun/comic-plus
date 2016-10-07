import {EXTRACTSUCCESS, EXTRACTERROR} from './constants'; 
import extractors from './extractors';
import extractEventCreator from './extractEventCreator';

const SITES = {
    dmzj: /manhua.dmzj.com\/[\w]+\/[\d]+.shtml/,
    lofter: /[\w]+.lofter.com\/post\/[\w]+/
}

export default function() {
    let _url = window.location.href, _match;

    for (let key of Object.keys(SITES)) {
        if (SITES[key].test(_url)) {
            _match = key;
            break;
        }
    }

    if (_match) {
        extractors[_match]();
    }
    else {
        extractEventCreator({
            type: EXTRACTERROR,
            payload: 'Extractor not found.'
        })
    }

}
