chrome.pageAction.onClicked.addListener(function(tab) {
    // const options = {
    //     type: 'popup',
    //     left: 100, top: 100,
    //     width: 1440, height: 900
    // };

    // // pass tabId
    // options.url = 'app.html#reader/' + tab.id;
    
    // chrome.windows.create(options, (win) => {
    //     console.log(win)
    // });
    chrome.tabs.sendMessage(tab.id, {type: 'CONNECT', payload: tab.id}, (response) => {
        console.log(response)
    });
});

// inject content script
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlMatches: '[0-9a-zA-z_]+\.lofter\.com\/post\/[0-9a-zA-z_]+' },
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { urlMatches: 'manhua\.dmzj\.com\/[0-9a-zA-z_]+\/[0-9]+\.shtml' },
                    })
                ],
                actions: [ new chrome.declarativeContent.ShowPageAction() ]
            }
        ]);
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request, sender)
    if (request.type) {
        chrome.runtime.sendMessage({
            type: 'test2'
        },(response) => {
                    console.log(response);
        })
    }        
})