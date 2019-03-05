import PropTypes from 'prop-types';
import React from 'react';

export default function Chat(props) {
  return (
    <li key={props.key} className="chat-content">
      <div className="user">{props.user}</div>
      <div className="chat">{props.text}</div>
    </li>
  );
}

Chat.propTypes = {
  key: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};
