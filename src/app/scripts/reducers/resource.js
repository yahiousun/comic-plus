import { PENDING, LOADED, FAILED, PREPARE, DOWNLOAD, ERROR } from '../constants'

const initialState = new Map();
export default (state = initialState, action) => {
    let status = state.get(action.payload);
    switch(action.type) {
        case PREPARE: {
            if (!status || status === FAILED) {
                return new Map(state).set(action.payload, PENDING);
            }
        }
        case DOWNLOAD: {
            if (status !== LOADED) {
                return new Map(state).set(action.payload, LOADED);
            }
        }
        case ERROR: {
            if (status === PENDING) {
                return new Map(state).set(action.payload, FAILED);
            }
        }
        default: {
            return state
        }
    }
}