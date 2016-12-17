function dmzj(id, options) {
  const VENDER = 'dmzj';
  const LOADING = 'loading';
  const PROGRESS = 'progress';
  const LOADED = 'loaded';
  const FAILED = 'failed';
  const EXTRACTOR_STATE_CHANGE = 'EXTRACTOR_STATE_CHANGE';

  function Extractor(id, options) {
    let self = this;
    self.id = id;
    self.options = Object.assign({}, Extractor.defaults, options);
    self.origin = `chrome-extension://${self.id}`;
    self.ref = document.getElementById(self.id);
    self.vender = VENDER;
    self.state = LOADING;

    self.baseUrl = document.location.protocol + '//manhua.dmzj.com';
    self.imagePrefix = document.location.protocol + '//images.dmzj.com/';

    self.post({
      type: EXTRACTOR_STATE_CHANGE,
      state: PROGRESS,
    });
    self.extract();
  }

  Extractor.prototype.extract = function(msg) {
    let self = this;
    if (self.state !== LOADING) {
      return;
    }
    self.state = PROGRESS;

    let contentsUrl = `${self.baseUrl}/${window.g_comic_url}`; 
    let promise = new Promise((resolve, reject) => {

      let data = null,
        pages = [],
        previousChapter = document.getElementById('prev_chapter'),
        nextChapter = document.getElementById('next_chapter'),
        contents = [];
      
      if (window.arr_pages) {
        data = {};

        window.arr_pages.forEach((item) => {
          pages.push(self.imagePrefix + item);
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
              chapterName: previousChapter.innerText,
            }
          })
        }

        if (nextChapter) {
          Object.assign(data, {
            next: {
              url: nextChapter.href,
              chapterName: nextChapter.innerText,
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
                      contents: [],
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

  Extractor.prototype.post = function(message) {
    if (this.ref && this.ref.contentWindow) {
      this.ref.contentWindow.postMessage(Object.assign({}, message, { id: this.id }), this.origin);
    }
  }

  Extractor.prototype.onTimeout = function() {
    if (this.state === PROGRESS) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: TIMEOUT,
      })
    }
  }

  Extractor.prototype.onLoad = function(ret) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS || this.state === TIMEOUT) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        payload: Object.assign({}, ret, { vender: self.vender, url: document.location.href }),
        state: LOADED,
      })
    }
  }

  Extractor.prototype.onError = function(err) {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.state === PROGRESS) {
      this.post({
        type: EXTRACTOR_STATE_CHANGE,
        state: FAILED,
      });
    }
  }

  Extractor.defaults = {
    timeout: 10000,
  }

  this.vender = VENDER;

  return new Extractor(id, options || {});
}

export default dmzj;