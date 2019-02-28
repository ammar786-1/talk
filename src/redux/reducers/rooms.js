import u from 'updeep';
import { ADD_ROOM, REMOVE_ROOM } from '../actions';

function reduceRooms(rooms = [], action) {
  switch (action.type) {
    case ADD_ROOM: {
      return [].concat(rooms, [{ key: action.key, name: action.name }]);
    }
    case REMOVE_ROOM: {
      return u(u.reject(r => r.key === action.key), rooms);
    }
    default:
      return rooms;
  }
}

export default reduceRooms;
