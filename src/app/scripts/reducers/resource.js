import { RESOURCE_LOADSTART, RESOURCE_PROGRESS, RESOURCE_LOAD, RESOURCE_ERROR, RESOURCE_TIMEOUT } from '../constants/actionTypes';
import { LOADING, PROGRESS, LOADED, FAILED, TIMEOUT } from '../constants/status';

const initialState = {
    status: PENDING,
    result: null,
    error: ''
}
export default (state = initialState, action) => {
    let status = state.get(action.payload);
    switch(action.type) {
        case RESOURCE_LOADSTART: {
            return { ...state, status: PENDING, result: null, error: '' };
        }
        case RESOURCE_PROGRESS: {
            return { ...state, status: PROGRESS, result: null };
        }
        case RESOURCE_LOAD: {
            return { ...state, status: LOADED, result: action.payload };
        }
        case RESOURCE_ERROR: {
            return { ...state, status: ERROR, error: action.payload };
        }
        case RESOURCE_TIMEOUT: {
            return { ...state, status: TIMEOUT };
        }
        default: {
            return state;
        }
    }
}