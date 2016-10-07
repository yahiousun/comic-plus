export default function (url) {
    return new Promise((resolve, reject) => {
        if (!url) {
            reject('An image url is required.');
        }
        let _img = document.createElement('img');
        _img.onload = () => {
            resolve(url);
        }
        _img.onerror = () => {
            reject(url);
        }
        _img.src = url;
    })
}