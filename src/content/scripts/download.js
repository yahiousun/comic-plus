import * as downloaders from './downloaders';

export default function (url, vender) {
    if (vender && downloaders[venter]) {
        return downloaders[venter](url);
    }
    else {
        return downloaders.universal(url);
    }
}