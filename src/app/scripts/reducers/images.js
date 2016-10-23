import { IMAGE_LOADSTART, IMAGE_PROGRESS, IMAGE_LOAD, IMAGE_ERROR, IMAGE_TIMEOUT } from '../constants/actionTypes';
import { LOADING, PROGRESS, LOADED, FAILED, TIMEOUT } from '../constants/status';

const initialState = new Map();
export default (state = initialState, action) => {
    console.log(action)
    let status = state.get(action.payload);
    switch(action.type) {
        case IMAGE_LOADSTART: {
            return !status || status === FAILED ? new Map(state).set(action.payload, LOADING) : state;
        }
        case IMAGE_PROGRESS: {
            return status === LOADING ? new Map(state).set(action.payload, PROGRESS) : state;
        }
        case IMAGE_LOAD: {
            return status !== LOADED ? new Map(state).set(action.payload, LOADED) : state;
        }
        case IMAGE_ERROR: {
            return status === PROGRESS ? new Map(state).set(action.payload, ERROR) : state;
        }
        case IMAGE_TIMEOUT: {
            return status === PROGRESS ? new Map(state).set(action.payload, TIMEOUT) : state;
        }
        default: {
            return state;
        }
    }
}