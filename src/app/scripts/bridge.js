import { APPPROGRESS, APPLOAD, APPERROR, IMAGEPROGRESS, IMAGELOAD, IMAGEERROR } from './constants';

export const bindWindowMessageHandler = (dispatch) => {
    window.addEventListener('message', (e) => {
        switch(e.data.type) {
            case APPPROGRESS: {
                dispatch({
                    type: APPPROGRESS
                })
            }
            case APPLOAD: {
                dispatch({
                    type: APPLOAD,
                    payload: e.data.payload
                })
            }
            case APPERROR: {
                dispatch({
                    type: APPERROR,
                    payload: e.data.payload
                })
            }
            case IMAGEPROGRESS: {
                dispatch({
                    type: IMAGEPROGRESS
                })
            }
            case IMAGELOAD: {
                dispatch({
                    type: IMAGELOAD,
                    payload: e.data.payload
                })
            }
            case IMAGEERROR: {
                dispatch({
                    type: IMAGEERROR,
                    payload: e.data.payload
                })
            }
            default: {
                console.log(e)
            }
        }
    })
}