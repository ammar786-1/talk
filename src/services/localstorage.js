const USERNAME = 'username';
const storage = {};

storage.getUsername = function() {
  return localStorage.getItem(USERNAME);
};

storage.setUsername = function(username) {
  localStorage.setItem(USERNAME, username);
};

export default storage;
