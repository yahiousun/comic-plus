import Embedded from './Embedded';
import Injector from './Injector';
import { Universal } from './extractors';

import { ACTIVE, INACTIVE, BACKGROUND, ACTIVATE, DEACTIVE, DOWNLOAD } from './constants';

let state = INACTIVE;
let embeddedApp;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case ACTIVATE: {
            if (state === INACTIVE) {
                state = ACTIVE;
                embeddedApp = new Embedded(chrome.extension.getURL('app.html') + '#reader/' + action.payload);
                embeddedApp.show();
            }
            else if (state === BACKGROUND) {
                state = ACTIVE;
                embeddedApp.show();
            }
        }
        case DEACTIVE: {
            if (state === ACTIVE) {
                state = BACKGROUND;
                embeddedApp.hide();
            }
        }
        case DOWNLOAD: {

        }
    }
})

window.addEventListener('message', (e) => {
    console.log(e);
})

embeddedApp = new Embedded(chrome.extension.getURL('app.html') + '#reader/', {
    id: chrome.runtime.id    
}).show();


setTimeout(() => {
    let injection = new Injector(Universal, chrome.runtime.id);
}, 2000)

// let extractor = new Universal();
// extractor.__promise__.then(
//     (res) => {
//         console.log(res);
//     },
//     (err) => {
//         console.log(err)
//     }
// )