export const SET_TITLE = 'SET_TITLE';
export const SET_CHATS = 'SET_CHATS';
export const ADD_CHATS = 'ADD_CHATS';
export const ADD_CHAT = 'ADD_CHAT';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const REMOVE_CHATS = 'REMOVE_CHATS';

export const setTitle = title => ({
  type: SET_TITLE,
  title
});

export const setChats = chats => ({
  type: SET_CHATS,
  chats
});

export const addChats = chats => ({
  type: ADD_CHATS,
  chats
});

export const addChat = chat => ({
  type: ADD_CHAT,
  chat
});

export const removeChat = chatKey => ({
  type: REMOVE_CHAT,
  chatKey
});

export const removeChats = chatKeys => ({
  type: REMOVE_CHATS,
  chatKeys
});
