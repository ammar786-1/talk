import { SET_TITLE } from '../actions/windowActions';

export function reduceTitle(title = '', action) {
  switch (action.type) {
    case SET_TITLE:
      return action.title;
    default:
      return title;
  }
}
