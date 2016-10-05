import { ADD_QUERY, REMOVE_QUERY } from '../constants'

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_QUERY: {
            if (state.indexOf(action.payload) > -1) {
                return state;
            }
            else {
                return state = [ ...state, action.payload ];
            }
        }
        case REMOVE_QUERY: {
            let index = state.indexOf(action.payload);
            if (index > -1) {
                return state = state.slice(0, index).concat(state.slice(index + 1));
            }
            else {
                return state;
            }
        }
        default: {
            return state
        }
    }
}
