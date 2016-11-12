import Immutable from 'immutable';
import {
    DOWNLOAD_STATE_CHANGE
} from '../constants/actionTypes';

const initialState = new Immutable.Map();
export default (state = initialState, action) => {
    switch(action.type) {
        case DOWNLOAD_STATE_CHANGE: {
            return state.set(action.payload, action.status);
        }
        default: {
            return state;
        }
    }
}