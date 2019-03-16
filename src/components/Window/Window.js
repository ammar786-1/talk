import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useRef } from 'react';
import { Icon } from 'semantic-ui-react';
import { addChat, setChats, setTitle } from '../../redux/actions/windowActions';
import { windowReducer } from '../../redux/reducers';
import firebase from '../../services/firebase';
import storage from '../../services/localstorage';
import Chat from './Chat';
import './Window.css';

export default function Window(props) {
  const input = useRef(null);
  const initialState = {
    title: '',
    chats: []
  };
  const [state, dispatch] = useReducer(windowReducer, initialState);

  useEffect(() => {
    firebase.getChats(props.roomKey).then(chats => {
      console.log('chats', chats);
      if (!chats) {
        dispatch(setChats([]));
      } else dispatch(setChats(chats));
    });
  }, []);

  useEffect(() => {
    async function getName() {
      dispatch(setTitle(await firebase.getName(props.roomKey)));
    }
    getName();
  }, []);

  function onInteraction() {
    props.onInteraction && props.onInteraction();
  }

  function inputKeyDown(e) {
    if (e.key === 'Enter' && input.current && input.current.value) {
      // add chat to localstorage first
      const c = {
        user: {
          name: 'user'
        },
        text: input.current.value
      };
      const chat = storage.addTempChat(c);
      // add chat to state
      dispatch(addChat(chat));
      // add chat to firebase
      firebase.addChat(props.roomKey, chat).then(() => {
        // remove chat from localstorage after success
        storage.removeTempChat(chat.key);
      });
      input.current.value = '';
    }
  }

  let className = 'Window';
  if (props.isActive) {
    className += ' active';
  }
  return (
    <div className={className} onMouseDown={onInteraction}>
      <header className="header handle">
        <span className="title">{state.title}</span>
        <Icon name="close" size="small" />
      </header>
      <div className="chats-wrapper">
        <ul className="chats">
          {state.chats.map(c => {
            return (
              <Chat user={c.user} key={c.key} chatKey={c.key} text={c.text} />
            );
          })}
        </ul>
      </div>
      <div className="input-wrapper">
        <input
          ref={input}
          type="text"
          placeholder="Write something..."
          onKeyDown={inputKeyDown}
        />
        <div className="send-wrapper">
          <Icon name="paper plane outline" size="small" />
        </div>
      </div>
    </div>
  );
}

Window.propTypes = {
  roomKey: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChat: PropTypes.func,
  onInteraction: PropTypes.func
};
