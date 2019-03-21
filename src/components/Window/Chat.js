import PropTypes from 'prop-types';
import React from 'react';

export default function Chat(props) {
  return (
    <li className="chat-content">
      <div className="user">{props.user.name}</div>
      <hr />
      <div className="chat">{props.chat.text}</div>
    </li>
  );
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
