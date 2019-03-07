import PropTypes from 'prop-types';
import React from 'react';

export default function Chat(props) {
  return (
    <li className="chat-content">
      <div className="user">{props.user.name}</div>
      <div className="chat">{props.text}</div>
    </li>
  );
}

Chat.propTypes = {
  chatKey: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};
