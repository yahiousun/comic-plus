import { ACTIVE, INACTIVE, BACKGROUND, ACTIVATE, DEACTIVATE } from '../constants'

const initialState = INACTIVE;

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTIVATE: {
            return state = ACTIVE;
        }
        case DEACTIVATE: {
            return state = state === ACTIVE ? BACKGROUND : INACTIVE;
        }
        default: {
            return state
        }
    }
}