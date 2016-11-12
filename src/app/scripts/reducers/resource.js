import Immutable from 'immutable';
import { EXTRACT_STATE_CHANGE } from '../constants/actionTypes';
import { LOADING, PROGRESS, LOADED, FAILED, TIMEOUT } from '../constants/status';

const initialState = Immutable.fromJS({
    status: LOADING,
    result: null,
    error: ''
});
export default (state = initialState, action) => {
    switch(action.type) {
        case EXTRACT_STATE_CHANGE: {
            switch (action.status) {
                case LOADED: {
                    return state
                                .set('status', action.status)
                                .set('result', action.payload)
                                .set('error', '')
                }
                case FAILED: {
                    return state
                                .set('status', action.status)
                                .set('error', action.error)
                }
                default: {
                    return state.set('status', action.status);
                }
            }
        }
        default: {
            return state;
        }
    }
}