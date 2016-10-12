import Embedded from './Embedded';
import Injector from './Injector';
import createBridge from './createBridge';

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