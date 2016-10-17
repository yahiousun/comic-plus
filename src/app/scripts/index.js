window.addEventListener('message', (e) => {
    console.log('embed recive', e)
})

window.parent.postMessage({
    id: chrome.runtime.id,
    type: 'prepare',
    payload: 'http://images.dmzj.com/y/%E4%B8%80%E6%8B%B3%E8%B6%85%E4%BA%BA/%E7%AC%AC100%E8%AF%9D/01.jpg'
}, '*');