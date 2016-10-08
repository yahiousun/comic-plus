import {EXTRACT_CHAPTER, STORAGEPREFIX, SELECT_CHAPTER, CONNECT, REQUEST_IMAGE, LOADED, FAILED, EXTRACTSUCCESS, EXTRACTERROR} from './constants';
import {handleExtract} from './bridge';
import extract from './extract';
import download from './download';
import injectApp from './injectApp';

window.addEventListener(EXTRACTSUCCESS, handleExtract, false);
window.addEventListener(EXTRACTERROR, handleExtract, false);

// bind request linstener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch(request.type) {
        case SELECT_CHAPTER: {
            window.sessionStorage.setItem(STORAGEPREFIX + 'isWaitingForExtractor', Date.now());
            window.location.href = request.payload;
            break;
        }
        case REQUEST_IMAGE: {
            download(request.payload).then((res) => {
                sendResponse({
                    type: LOADED,
                    payload: res
                })
            },
            (err) => {
                sendResponse({
                    type: FAILED,
                    payload: err
                })
            })
            return true;
        }
        case CONNECT: {
            console.log(request)
            if (!injectApp.src && request.payload) {
                injectApp.src = chrome.extension.getURL('app.html') + '#reader/' + request.payload + '?protocol=http:';
                document.body.appendChild(injectApp);
                injectApp.onload = function () {
                    console.log(111)
                    chrome.runtime.sendMessage(
                        {
                            type: 'test',
                            payload: 'test'
                        },
                        (response) => {
                            console.log(response);
                        }
                    );
                }
            }
            sendResponse({
                type: 'CONNECTED'
            })
        }
        default: {
            extract();
        }
    }
});

let isWaitingForExtractor = window.sessionStorage.getItem(STORAGEPREFIX + 'isWaitingForExtractor');

if (isWaitingForExtractor) {
    window.sessionStorage.removeItem(STORAGEPREFIX + 'isWaitingForExtractor');
    extract();
}