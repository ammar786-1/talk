import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'semantic-ui-react';
import Draggable from './Draggable';
import './Window.css';

function Window1(props) {
  const input = useRef(null);

  function onInteraction() {
    props.onInteraction && props.onInteraction();
  }

  function inputKeyDown(e) {
    if (e.key === 'Enter' && input.current && input.current.value) {
      props.onChat && props.onChat(props.room, input.current.value);
    }
  }

  function renderContent() {
    let className = 'Window';
    if (props.isActive) {
      className += ' active';
    }
    return (
      <div className={className} onMouseDown={onInteraction} onTouchStart={onInteraction}>
        <header className="handle">{props.room.title}</header>
        <div className="chats-wrapper">
          <ul className="chats">
            {props.room.chats.map((c, i) => {
              return (
                <li key={i} className="chat-content">
                  <div className="user">user</div>
                  <div className="chat">{c}</div>
                </li>
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

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="slide">
      <Draggable zIndex={props.isActive ? 2 : 0} x={10} y={10} child={renderContent()} />
    </CSSTransition>
  );
}

Window1.propTypes = {
  room: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChat: PropTypes.func
};

export default Window1;
