import {EVENT_EXTRACT_SUCCESS, EVENT_EXTRACT_ERROR} from './constants';

export default (res) => {
    let _event;

    if (res.type) {
        _event = new CustomEvent(res.type, {
            'detail': {
                'payload': res.payload || 'Data not found.'
            }
        });
    }
    else {
        _event = new CustomEvent(EVENT_EXTRACT_ERROR, {
            'detail': {
                'payload': res.payload || 'An unknown error occurred.'
            }
        });
    }
   
    window.dispatchEvent(_event);    
}