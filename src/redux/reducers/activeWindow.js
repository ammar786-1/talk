import { SET_ACTIVE_WINDOW } from '../actions';

function reduceActiveWindow(activeWindow = '', action) {
  switch (action.type) {
    case SET_ACTIVE_WINDOW:
      return action.roomKey;
    default:
      return activeWindow;
  }
}

export default reduceActiveWindow;
