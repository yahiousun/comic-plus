function dmzj(options) {

    const LOADING = 'loading';
    const PROGRESS = 'progress';
    const LOADED = 'loaded';
    const FAILED = 'failed';

    const RESOURCE_LOAD = 'RESOURCE_LOAD';
    const RESOURCE_TIMEOUT = 'RESOURCE_TIMEOUT';
    const RESOURCE_ERROR = 'RESOURCE_ERROR';
    const RESOURCE_PROGRESS = 'RESOURCE_PROGRESS';

    function Extractor(id, options) {
        let self = this;
        self.id = id;
        self.options = Object.assign({}, Extractor.defaults, options);
        self.origin = 'chrome-extension://' + self.id;
        self.ref = document.getElementById(self.id);
        self.vender = 'dmzj';
        self.status = LOADING;

        self.baseUrl = document.location.protocol + '//manhua.dmzj.com';
        self.imgPrefix = document.location.protocol + '//images.dmzj.com/';

        self.post({
            type: RESOURCE_PROGRESS
        });
        self.extract();
    }

    Extractor.prototype.extract = function(msg) {
        let self = this;
        if (self.status !== LOADING) {
            return;
        }
        self.status = PROGRESS;

        let contentsUrl = self.baseUrl + '/' + window.g_comic_url; 
        let promise = new Promise((resolve, reject) => {

            let data = null,
                pages = [],
                previousChapter = document.getElementById('prev_chapter'),
                nextChapter = document.getElementById('next_chapter'),
                contents = [];
            
            if (window.arr_pages) {
                data = {};

                window.arr_pages.forEach((item) => {
                    pages.push(self.imgPrefix + item);
                })

                data = {
                    url: self.baseUrl + '/' + window.g_chapter_url,
                    title: window.g_comic_name + ' ' + window.g_chapter_name,
                    pages: pages
                }

                if (previousChapter) {
                    Object.assign(data, {
                        previous: {
                            url: previousChapter.href,
                            chapterName: previousChapter.innerText
                        }
                    })
                }

                if (nextChapter) {
                    Object.assign(data, {
                        next: {
                            url: nextChapter.href,
                            chapterName: nextChapter.innerText
                        }
                    })
                }

                fetch(contentsUrl).then(
                    (ret) => {
                        if (ret.ok) {
                            ret.text().then(
                                (text) => {
                                    let doc, titles, mainContents, relatedContents;
                                    
                                    doc = document.implementation.createHTMLDocument('');
                                    doc.documentElement.innerHTML = text;
                                    
                                    titles = doc.querySelectorAll('.photo_part h2');
                                    mainContents = doc.querySelectorAll('.cartoon_online_border');
                                    relatedContents = doc.querySelectorAll('.cartoon_online_border_other');

                                    if (titles.length && mainContents.length) {
                                        let mainContentsObj = {
                                            title: titles[0].innerText,
                                            contents: []
                                        }
                                        for (let i = 0; i <  mainContents.length; i++) {
                                            for (let node of mainContents[i].querySelectorAll('a')) {
                                                mainContentsObj.contents.push({
                                                    title: node.getAttribute('title'),
                                                    chapterName: node.innerText,
                                                    chapterUrl: node.href
                                                })
                                            }
                                        }
                                        contents.push(mainContentsObj);
                                    }

                                    if (titles.length && relatedContents.length) {
                                        for (let i = 1; i <  relatedContents.length; i++) {
                                            let relatedContentsObj = {
                                                title: titles[i + 1].innerText,
                                                contents: []
                                            }
                                            for (let node of relatedContents[i].querySelectorAll('a')) {
                                                relatedContentsObj.contents.push({
                                                    title: node.getAttribute('title'),
                                                    chapterName: node.innerText,
                                                    chapterUrl: self.baseUrl + node.getAttribute('href')
                                                })
                                            }
                                            contents.push(relatedContentsObj);
                                        }
                                    }

                                    if (contents.length) {
                                        data.contents = contents;
                                    }
                                    resolve(data);
                                },
                                (err) => {
                                    resolve(data);
                                }
                            );
                        }
                        else {
                            resolve(data);
                        }
                    },
                    (err) => {
                        resolve(data);
                    }
                );
            }
            else {
                reject(null);
            }
        });

        promise.then(
            (ret) => {
                self.onLoad(ret);
            },
            (err) => {
                self.onError('Data not found!');
            }
        )
    }

    Extractor.prototype.post = function(msg) {
        let self = this;
        if (self.ref && self.ref.contentWindow) {
            self.ref.contentWindow.postMessage(Object.assign({}, msg, {id: self.id}), self.origin);
        }
    }

    Extractor.prototype.bindTimeout = function() {
        let self = this;
        setTimeout(self.onTimeout.bind(self), self.timeout);
    }

    Extractor.prototype.onTimeout = function() {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: RESOURCE_TIMEOUT,
            })
        }
    }

    Extractor.prototype.onLoad = function(ret) {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: RESOURCE_LOAD,
                payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href })
            })
        }
    }

    Extractor.prototype.onError = function(err) {
        let self = this;
        if (self.status === PROGRESS) {
            self.post({
                type: RESOURCE_ERROR
            })
        }
    }

    Extractor.defaults = {
        timeout: 10000,
        minWidth: 0,
        minHeight: 0
    }

    return new Extractor(options);
}

dmzj.vender = 'dmzj';

export default dmzj;