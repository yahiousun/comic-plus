import { EXTRACTION_START, EXTRACTION_PENDING, EXTRACTION_SUCCESS, EXTRACTION_FAILED, EXTRACTION_LOADING, LOADING, PENDING, LOADED, FAILED } from '../constants'

const initialState = {
    status: LOADING,
    result: null,
    error: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case EXTRACTION_START: {
            return state = { ...state, status: LOADING };
        }
        case EXTRACTION_PENDING: {
            return state = { ...state, status: PENDING };
        }
        case EXTRACTION_SUCCESS: {
            return state = { ...state, result: action.payload, status: LOADED }
        }
        case EXTRACTION_FAILED: {
            return state = { ...state, error: action.payload, status: FAILED }
        }
        default: {
            return state
        }
    }
}
