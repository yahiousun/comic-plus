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
    sendResponse('RESPONSE FROM BACKGROUND');
    return;
})