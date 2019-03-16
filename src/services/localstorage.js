import * as uuid from 'uuid/v4';

const USERNAME = 'username';
const TEMP_CHATS = 'temp_chats';
const storage = {};

storage.getUsername = function() {
  return localStorage.getItem(USERNAME);
};

storage.setUsername = function(username) {
  localStorage.setItem(USERNAME, username);
};

storage.addTempChat = function(c) {
  const chat = Object.assign({}, c);
  const key = getUuid();
  chat.key = key;
  const chats = localStorage.getItem(TEMP_CHATS);
  if (!chats) {
    localStorage.setItem(TEMP_CHATS, JSON.stringify([chat]));
  } else {
    const chatsTemp = JSON.parse(chats);
    chatsTemp.push(chat);
    localStorage.setItem(TEMP_CHATS, JSON.stringify(chatsTemp));
  }
  return chat;
};

storage.getTempChats = function() {
  console.log(localStorage.getItem(TEMP_CHATS));
};

storage.removeTempChat = function(key) {
  const cs = localStorage.getItem(TEMP_CHATS);
  if (!cs) return;
  const chats = JSON.parse(cs);
  const i = chats.findIndex(chat => chat.key === key);
  if (i < 0) return;
  chats.splice(i, 1);
  localStorage.setItem(TEMP_CHATS, JSON.stringify(chats));
};

function getUuid() {
  return uuid();
}

export default storage;
