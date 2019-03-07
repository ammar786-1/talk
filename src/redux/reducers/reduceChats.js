import u from 'updeep';
import {
  ADD_CHAT,
  ADD_CHATS,
  REMOVE_CHAT,
  REMOVE_CHATS,
  SET_CHATS
} from '../actions/windowActions';

export function reduceChats(chats = [], action) {
  switch (action.type) {
    case SET_CHATS:
      return action.chats;
    case ADD_CHATS:
      return [].concat(chats, [...action.chats]);
    case ADD_CHAT:
      return [].concat(chats, [action.chat]);
    case REMOVE_CHAT:
      return u(u.reject(chat => chat.key === action.chatKey), chats);
    case REMOVE_CHATS:
      return u(u.reject(chat => action.chatKeys.includes(chat.key)), chats);
    default:
      return chats;
  }
}
