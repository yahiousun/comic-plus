import { TOGGLE } from './constants';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('BACKGROUND RECIVE', request, sender)
    if (request.type === 'START') {
        chrome.browserAction.setBadgeText({
            text: sender.id,
            tabId: typeof sender.id === 'string' ? sender.tab.id : sender.id
        })
    }
    else {
        chrome.browserAction.setBadgeText({
            text: 'No',
            tabId: typeof sender.id === 'string' ? sender.tab.id : sender.id
        })
    }
    return;
})

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {type: TOGGLE, payload: tab.id}, (response) => {
        console.log(response)
    });
})
