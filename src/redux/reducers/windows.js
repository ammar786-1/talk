import u from 'updeep';
import { CLOSE_WINDOW, OPEN_WINDOW } from '../actions';

function reduceWindows(windows = [], action) {
  switch (action.type) {
    case OPEN_WINDOW:
      return [].concat(windows, [action.roomKey]);
    case CLOSE_WINDOW:
      return u(u.reject(window => window === action.roomKey), windows);
    default:
      return windows;
  }
}

export default reduceWindows;
