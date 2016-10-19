import { INITIALIZE, CACHED } from './constants';

import { initialize } from './actions/extract';
import { cached } from './actions/download';

export default function(store) {
    window.addEventListener('message', (e) => {
        if (e.data && e.data.id && e.data.id === chrome.runtime.id) {
            switch(e.data.type) {
                case INITIALIZE: {
                    store.dispatch(initialize(e.data.payload));
                    break;
                }
                case CACHED: {
                    store.dispatch(cached(e.data.payload));
                    break;
                }
            }
        }
    })
}

