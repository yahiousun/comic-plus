function Universal() {
    let self = this,
        images = [];

    self.__promise__ = new Promise((resolve, reject) => {
        self.resolve = resolve;
        self.reject = reject;
        setTimeout(() => {
           reject(-1);
        }, 10000)
    })
    self.__promise__.then(
        (ret) => {
            window.postMessage({
                type: 'extract',
                payload: Object.assign({}, ret, { vender: self.__vender__, url: document.location.href })
            }, '*');
        },
        (err) => {
            window.postMessage({
                type: 'error',
                payload: err
            }, '*');
        }
    );
    self.__vender__ = 'Universal';
    
    for (let img of document.images) {
        if (img.width && img.height) {
            images.push(img.src);
        }
    }

    if (images.length) {
        this.resolve({
            title: document.title,
            images: images.slice()
        });
    }
    else {
        this.reject(10001);
    }
}

export default Universal;