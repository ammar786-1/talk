import { SET_USERNAME } from '../actions/appActions';

function reduceUsername(username = '', action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.name;
    default:
      return username;
  }
}

export default reduceUsername;
