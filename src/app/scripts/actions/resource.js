import { EXTRACTOR_STATE_CHANGE, EXTRACT } from '../constants/actionTypes';
import { LOADING } from '../constants/state';

export function loadResource() {
  return (dispatch, getState) => {
    dispatch({
      type: EXTRACTOR_STATE_CHANGE,
      state: LOADING,
    });
    window.parent.postMessage({
      id: chrome.runtime.id,
      type: EXTRACT,
    }, '*');
  };
}

export function extractorStateChange(payload, state, error) {
  return {
    type: EXTRACTOR_STATE_CHANGE,
    payload: payload,
    state: state,
    error: error,
  };
}
