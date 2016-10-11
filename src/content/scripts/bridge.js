import { TOGGLE, START, TERMINATE} from './constants';
import InjectApp from './InjectApp';

let injectApp;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('CONTENT RECIVE', request, sender)

    switch (request.type) {
        case START: {
            if (!injectApp) {
                injectApp = new InjectApp(chrome.extension.getURL('app.html') + '#reader/' + request.payload);
            }
            sendResponse({
                type: START
            })
            break;
        }
        case TERMINATE: {
            if (injectApp) {
                injectApp.terminate();
                injectApp = null;
            }
            sendResponse({
                type: TERMINATE
            })
            break;
        }
    } 

    sendResponse('RESPONSE FROM CONTENT'); 
    return true;
})