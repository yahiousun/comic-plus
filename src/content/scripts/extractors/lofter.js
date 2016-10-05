import {EXTRACTSUCCESS, EXTRACTERROR} from '../constants'; 
import extractEventCreator from '../extractEventCreator';

export default () => {
    let _postinner = document.getElementsByClassName('postinner')[0],
        _images = [],
        _title,
        _link,
        _data = null;

    if (_postinner) {
        _data = {};
        _data.contents = false;
        _title = _postinner.getElementsByClassName('ttl')[0];
        _link = _postinner.querySelector('.ttl > a');
        if (_title) {
            _data.title = _title.innerText;
        }
        if (_link) {
            _data.url = _link.href;
        }
        for (let _image of _postinner.getElementsByTagName('img')) {
            _images.push(_image.src);
        }
        _data.images = _images;
    }
    extractEventCreator({
        type: _data ? EXTRACTSUCCESS : EXTRACTERROR,
        payload: _data ? _data : 'Data not found.'
    });
}