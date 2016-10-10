import './bridge';

chrome.runtime.sendMessage(
    {
        type: 'REQUEST_FROM_CONTENT_TO_BACKGROUND'
    }, function(response) {
        console.log('CONTENT RECIVE', response);
    }
);