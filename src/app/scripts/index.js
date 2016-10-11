console.log('EMBED LOADED')

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('EMBED RECIVE', request, sender);
    sendResponse('response from embed');
    return true;
});

chrome.runtime.sendMessage(
    {
        type: 'REQUEST_FROM_EMBED_TO_BACKGROUND'
    }, function(response) {
        console.log('EMBED RECIVE', response);
    }
);

window.addEventListener('message', (e) => {
    console.log('embed recive', e)
})

window.parent.postMessage({
    type: 'EXTRECT'
}, '*');

console.log('chromeid', chrome.runtime.id)