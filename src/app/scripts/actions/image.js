import { DOWNLOAD_STATE_CHANGE, PREPARE } from '../constants/actionTypes';
import { LOADING } from '../constants/state';

export function downloadImage(url) {
  return (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_STATE_CHANGE,
      payload: url,
      state: LOADING,
    });
    window.parent.postMessage({
      id: chrome.runtime.id,
      type: PREPARE,
      payload: url,
    }, '*');
  }
}

export function downloadImageStateChange(url, state) {
  return {
    type: DOWNLOAD_STATE_CHANGE,
    payload: url,
    state: state,
  };
}
