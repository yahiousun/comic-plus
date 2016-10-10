import { START } from './constants';

chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {type: START, payload: tab.id}, (response) => {
        if (response.type === 'START') {
            chrome.browserAction.setBadgeText({
                text: String(tab.id),
                tabId: Number(tab.id)
            })
            setTimeout(() => {
                chrome.tabs.sendMessage(tab.id, {type: 'BROADCAST FROM BACKGROUND', payload: tab.id}, (response) => {
                    console.log('BACKGROUND RECIVE', response)
                })
            }, 3000)
        }
        else {
            chrome.browserAction.setBadgeText({
                text: 'No',
                tabId: Number(tab.id)
            })
        }
    });
});