import reduceActiveWindow from './activeWindow';
import reduceRooms from './rooms';
import reduceUsername from './username';
import reduceWindows from './windows';

function appReducer(state, action) {
  return {
    username: reduceUsername(state.username, action),
    rooms: reduceRooms(state.rooms, action),
    windows: reduceWindows(state.windows, action),
    activeWindow: reduceActiveWindow(state.activeWindow, action)
  };
}

export default appReducer;
