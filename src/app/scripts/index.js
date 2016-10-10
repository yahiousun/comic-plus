console.log('EMBED LOADED')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('EMBED RECIVE', request, sender);
    sendResponse('response from embed')
});

chrome.runtime.sendMessage(
    {
        type: 'REQUEST_FROM_EMBED_TO_BACKGROUND'
    }, function(response) {
        console.log('EMBED RECIVE', response);
    }
);