import u from 'updeep';
import {
  ADD_ROOM,
  ADD_ROOMS,
  REMOVE_ROOM,
  SET_ROOMS
} from '../actions/appActions';

function reduceRooms(rooms = [], action) {
  switch (action.type) {
    case ADD_ROOM: {
      return [].concat(rooms, [{ key: action.key, name: action.name }]);
    }
    case ADD_ROOMS: {
      return [].concat(rooms, action.rooms);
    }
    case SET_ROOMS: {
      return action.rooms;
    }
    case REMOVE_ROOM: {
      return u(u.reject(r => r.key === action.key), rooms);
    }
    default:
      return rooms;
  }
}

export default reduceRooms;
