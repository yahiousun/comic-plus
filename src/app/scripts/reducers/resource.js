import Immutable from 'immutable';
import { EXTRACTOR_STATE_CHANGE } from '../constants/actionTypes';
import { LOADING, LOADED, FAILED } from '../constants/state';

const initialState = Immutable.fromJS({
  state: LOADING,
  result: null,
  error: '',
});
export default (state = initialState, action) => {
  switch(action.type) {
    case EXTRACTOR_STATE_CHANGE: {
      switch (action.state) {
        case LOADED: {
          return state
            .set('state', action.state)
            .set('result', action.payload)
            .set('error', '');
        }
        case FAILED: {
          return state
            .set('state', action.state)
            .set('error', action.error);
        }
        default: {
          return state.set('state', action.state);
        }
      }
    }
    default: {
      return state;
    }
  }
}
