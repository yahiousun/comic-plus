function Universal(id, timeout) {
    let self = this,
        images = [];

    self.__target__ = id ? document.getElementById(id).contentWindow : window;

    self.__timeout__ = timeout || 10000;

    self.__vender__ = 'Universal';

    self.__promise__ = new Promise((resolve, reject) => {
        self.resolve = resolve;
        self.reject = reject;
        setTimeout(() => {
           reject(-1);
        }, self.__timeout__)
    })
    self.__promise__.then(
        (ret) => {
            self.__target__.postMessage({
                type: 'extract',
                payload: Object.assign({}, ret, { vender: self.__vender__, url: document.location.href })
            }, '*');
        },
        (err) => {
            self.__target__.postMessage({
                type: 'error',
                payload: err
            }, '*');
        }
    );
    
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