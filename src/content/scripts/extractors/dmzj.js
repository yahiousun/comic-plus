import {EXTRACT_CHAPTER, EXTRACT_CONTENTS} from '../constants';
import Injector from './Injector';
export default () => {

    let textContent = '(' + function() {
        // custom event
        const EXTRACTSUCCESS = 'extractsuccess';
        const EXTRACTERROR = 'extracterror';

        const BASE_URL = 'http://manhua.dmzj.com/';
        const IMG_PREFIX = 'http://images.dmzj.com/';

        let _event;
        let _contentsUrl = BASE_URL + window.g_comic_url; 
        let _promise = new Promise((resolve, reject) => {

            let _data = null,
                _images = [],
                _previousChapter = document.getElementById('prev_chapter'),
                _nextChapter = document.getElementById('next_chapter'),
                _contents = [];
            
            if (window.arr_pages) {
                _data = {};

                window.arr_pages.forEach((item) => {
                    _images.push(IMG_PREFIX + item);
                })

                _data = {
                    url: BASE_URL + window.g_chapter_url,
                    title: window.g_comic_name + ' ' + window.g_chapter_name,
                    total: window.g_max_pic_count,
                    images: _images
                }

                if (_previousChapter) {
                    Object.assign(_data, {
                        previous: {
                            url: _previousChapter.href,
                            chapterName: _previousChapter.innerText
                        }
                    })
                }

                if (_nextChapter) {
                    Object.assign(_data, {
                        next: {
                            url: _nextChapter.href,
                            chapterName: _nextChapter.innerText
                        }
                    })
                }


                
                fetch(_contentsUrl).then(
                    (res) => {
                        if (res.ok) {
                            res.text().then(
                                (text) => {
                                    let _doc, _titles, _mainContents, _relatedContents;
                                    
                                    _doc = document.implementation.createHTMLDocument('');
                                    _doc.documentElement.innerHTML = text;
                                    
                                    _titles = _doc.querySelectorAll('.photo_part h2');
                                    _mainContents = _doc.querySelector('.cartoon_online_border');
                                    _relatedContents = _doc.querySelectorAll('.cartoon_online_border_other');

                                    if (_titles.length && _mainContents) {
                                        let _mainContentsObj = {
                                            title: _titles[0].innerText,
                                            contents: []
                                        }
                                        for (let node of _mainContents.querySelectorAll('a')) {
                                            _mainContentsObj.contents.push({
                                                title: node.getAttribute('title'),
                                                chapterName: node.innerText,
                                                chapterUrl: BASE_URL + node.getAttribute('href')
                                            })
                                        }
                                        _contents.push(_mainContentsObj);
                                    }

                                    if (_titles.length && _relatedContents.length) {
                                        for (let i = 1; i <  _relatedContents.length; i++) {
                                            let _relatedContentsObj = {
                                                title: _titles[i + 1].innerText,
                                                contents: []
                                            }
                                            for (let node of _relatedContents[i].querySelectorAll('a')) {
                                                _relatedContentsObj.contents.push({
                                                    title: node.getAttribute('title'),
                                                    chapterName: node.innerText,
                                                    chapterUrl: BASE_URL + node.getAttribute('href')
                                                })
                                            }
                                            _contents.push(_relatedContentsObj);
                                        }
                                    }

                                    if (_contents.length) {
                                        _data.contents = _contents;
                                    }
                                    resolve(_data);
                                },
                                (err) => {
                                    resolve(_data);
                                }
                            );
                        }
                        else {
                            resolve(_data);
                        }
                    },
                    (err) => {
                        resolve(_data);
                    }
                );
            }
            else {
                reject(null);
            }
        
        });

        _promise.then(
            (res) => {
                _event = new CustomEvent(EXTRACTSUCCESS, {
                    'detail': {
                        'payload': res
                    }
                });
                window.dispatchEvent(_event);
            },
            (err) => {
                _event = new CustomEvent(EXTRACTERROR, {
                    'detail': {
                        'payload': err || 'Data not found.'
                    }
                });
                window.dispatchEvent(_event);
            }
        )
    } + ')();'
    
    return new Injector(textContent);
}