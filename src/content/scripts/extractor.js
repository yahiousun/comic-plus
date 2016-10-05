import {EVENT_EXTRACT_SUCCESS, EVENT_EXTRACT_ERROR} from './constants'; 
import extractors from './extractors';
import extractEventCreator from './extractEventCreator';

const SITES = {
    dmzj: /manhua.dmzj.com\/[\w]+\/[\d]+.shtml/,
    lofter: /[\w]+.lofter.com\/post\/[\w]+/
}

export const extractor = () => {
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
            type: EVENT_EXTRACT_ERROR,
            payload: 'Extractor not found.'
        })
    }

}
