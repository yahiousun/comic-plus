import './bridge';

chrome.runtime.sendMessage(
    {
        type: 'REQUEST_FROM_CONTENT_TO_BACKGROUND'
    }, function(response) {
        console.log('CONTENT RECIVE', response);
    }
);

let reciver = function () {
    window.addEventListener('message', function (e) {
        console.log('window recive', e);
        e.source.postMessage('resp from window', 'chrome-extension://ipooeoifajefjbnconahnidblhnklbbh')
    })
}

let textContent = '(' + reciver + ')()';

let script = document.createElement('script');

script.textContent = textContent;

document.body.appendChild(script);

window.addEventListener('message', function (e) {
    console.log('content recive', e);
    e.source.postMessage('resp from content', '*')
})