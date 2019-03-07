import { reduceChats } from './reduceChats';
import { reduceTitle } from './reduceTitle';

export default function windowReducer(state, action) {
  return {
    title: reduceTitle(state.title, action),
    chats: reduceChats(state.chats, action)
  };
}
