import { PREPARE, EXTRACT, DOWNLOAD } from './constants';

export const bindWindowMessageHandler = (dispatch) => {
    window.addEventListener('message', (e) => {
        switch(e.data.type) {
            case PREPARE: {
                dispatch({
                    type: PREPARE
                })
            }
            case EXTRACT: {
                dispatch({
                    type: EXTART,
                    payload: e.data.payload
                })
            }
            case DOWNLOAD: {
                dispatch({
                    type: DOWNLOAD,
                    payload: e.data.payload
                })
            }
            default: {
                console.log(e)
            }
        }
    })
}