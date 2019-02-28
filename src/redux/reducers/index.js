import reduceRooms from './rooms';
import reduceUsername from './username';
import reduceWindows from './windows';

const initialState = {
  username: '',
  rooms: [],
  windows: [],
  activeWindow: null
};

function talk(state = initialState, action) {
  return {
    username: reduceUsername(state.username, action),
    rooms: reduceRooms(state.rooms, action),
    windows: reduceWindows(state.windows, action)
  };
}

export default talk;
