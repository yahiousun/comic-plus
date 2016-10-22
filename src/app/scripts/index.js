window.addEventListener('message', (e) => {
    console.log('embed recive', e)
})

window.parent.postMessage({
    id: chrome.runtime.id,
    type: 'EXTRACT'
}, '*');