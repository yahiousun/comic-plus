import { EXTRACT } from './constants';

export default () => {
    window.addEventListener(EXTRACT, (e) => {
        
        // forward data to iframe
        window.postMessage({
            type: EXTRACT,
            payload: e.detail.data
        }, '*');

    }, false)
}