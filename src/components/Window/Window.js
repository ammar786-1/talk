import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'semantic-ui-react';
import Draggable from './Draggable';
import './Window.css';

class Window extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onInteraction = this.onInteraction.bind(this);
  }

  static propTypes = {
    room: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onChat: PropTypes.func
  };

  onInteraction() {
    this.props.onInteraction && this.props.onInteraction();
  }

  inputKeyDown(e) {
    if (e.key === 'Enter' && this.input && this.input.value) {
      this.props.onChat && this.props.onChat(this.props.room, this.input.value);
    }
  }

  renderContent() {
    let className = 'Window';
    if (this.props.isActive) {
      className += ' active';
    }
    return (
      <div
        className={className}
        onMouseDown={this.onInteraction}
        onTouchStart={this.onInteraction}
      >
        <header className="handle">{this.props.room.title}</header>
        <div className="chats-wrapper">
          <ul className="chats">
            {this.props.room.chats.map((c, i) => {
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
            ref={input => {
              this.input = input;
            }}
            type="text"
            placeholder="Write something..."
            onKeyDown={this.inputKeyDown.bind(this)}
          />
          <div className="send-wrapper">
            <Icon name="paper plane outline" size="small" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <CSSTransition in={true} appear={true} timeout={300} classNames="slide">
        <Draggable
          zIndex={this.props.isActive ? 2 : 0}
          x={10}
          y={10}
          child={this.renderContent()}
        />
      </CSSTransition>
    );
  }
}

export default Window;
