import { SET_USERNAME } from '../actions';

function reduceUsername(username = '', action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.name;
    default:
      username;
  }
}

export default reduceUsername;
