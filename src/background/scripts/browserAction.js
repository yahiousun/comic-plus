import { TOGGLE, SESSION_REQUEST } from './constants';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('BACKGROUND RECIVE', request, sender)
    // if (request.type === 'START') {
    //     chrome.browserAction.setBadgeText({
    //         text: sender.id,
    //         tabId: typeof sender.id === 'string' ? sender.tab.id : sender.id
    //     })
    // }
    // else {
    //     chrome.browserAction.setBadgeText({
    //         text: 'No',
    //         tabId: typeof sender.id === 'string' ? sender.tab.id : sender.id
    //     })
    // }
    if (request.type === SESSION_REQUEST) {
        let id = (sender.tab && sender.tab.id) ? sender.tab.id : id;
        chrome.tabs.sendMessage(id, {type: TOGGLE, payload: id}, (response) => {
            console.log(response)
        });
    }
    
    return;
})

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {type: TOGGLE, payload: tab.id}, (response) => {
        console.log(response)
    });
})
