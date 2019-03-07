import PropTypes from 'prop-types';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import appReducer from '../../redux/appReducer';
import firebase from '../../services/firebase';
import Chat from './Chat';
import './Window.css';

export default function Window(props) {
  const input = useRef(null);
  const [name, setName] = useState('');
  const [chats, setChats] = useState([]);
  const [state, dispatch] = useReducer(appReducer);

  useEffect(() => {
    firebase.getChats(props.roomKey, chats => {
      console.log('chats', chats);
      if (!chats) {
        setChats([]);
      } else setChats(chats);
    });
  }, []);

  useEffect(() => {
    async function getName() {
      setName(await firebase.getName(props.roomKey));
    }
    getName();
  }, []);

  function onInteraction() {
    props.onInteraction && props.onInteraction();
  }

  function inputKeyDown(e) {
    if (e.key === 'Enter' && input.current && input.current.value) {
      props.onChat && props.onChat(props.roomKey, input.current.value);
    }
  }

  let className = 'Window';
  if (props.isActive) {
    className += ' active';
  }
  return (
    <div
      className={className}
      onMouseDown={onInteraction}
      onTouchStart={onInteraction}
    >
      <header className="header handle">
        <span className="title">{name}</span>
        <Icon name="close" size="small" />
      </header>
      <div className="chats-wrapper">
        <ul className="chats">
          {chats.map((c, i) => {
            return (
              <Chat
                user={{
                  name: 'user'
                }}
                key={i}
                text={c}
              />
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
