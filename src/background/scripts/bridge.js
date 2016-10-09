chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender)
    if (request.type === 'START') {
        chrome.browserAction.setBadgeText({
            text: sender.id,
            tabId: sender.id
        })
    }
    else {
        chrome.browserAction.setBadgeText({
            text: '',
            tabId: sender.id
        })
    }
    
})