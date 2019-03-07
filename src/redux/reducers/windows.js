import u from 'updeep';
import { CLOSE_WINDOW, OPEN_WINDOW } from '../actions/appActions';

function reduceWindows(windows = [], action) {
  switch (action.type) {
    case OPEN_WINDOW:
      return [].concat([action.roomKey], windows);
    case CLOSE_WINDOW:
      return u(u.reject(window => window === action.roomKey), windows);
    default:
      return windows;
  }
}

export default reduceWindows;
