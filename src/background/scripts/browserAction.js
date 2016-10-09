import { START } from './constants';

chrome.browserAction.onClicked.addListener((tab) => {
    console.log(tab)
    chrome.tabs.sendMessage(tab.id, {type: START, payload: tab.id}, (response) => {
        console.log(response)
    });
});