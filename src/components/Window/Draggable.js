/**
 * Credit: https://stackoverflow.com/a/49348134/1436766
 */

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relX: 0,
      relY: 0,
      x: props.x,
      y: props.y
    };
    this.gridX = props.gridX || 1;
    this.gridY = props.gridY || 1;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    const parentNode = ReactDOM.findDOMNode(this.parentDiv);
    const child = parentNode.firstChild;
    const childHandle = child.querySelector('.handle');
    this.handle = childHandle || this.parentDiv;
    this.handle.addEventListener('mousedown', this.onMouseDown);
    this.handle.addEventListener('touchstart', this.onTouchStart);
  }

  onStart(e) {
    const ref = ReactDOM.findDOMNode(this.parentDiv);
    const body = document.body;
    const box = ref.getBoundingClientRect();
    this.setState({
      relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
      relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
    });
  }

  onMove(e) {
    const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
    const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
    if (x !== this.state.x || y !== this.state.y) {
      this.setState({
        x,
        y
      });
      this.props.onMove && this.props.onMove(this.state.x, this.state.y);
    }
  }

  onMouseDown(e) {
    if (e.button !== 0) return;
    this.onStart(e);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
    e.preventDefault();
  }

  onMouseUp(e) {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
  }

  onMouseMove(e) {
    this.onMove(e);
    e.preventDefault();
  }

  onTouchStart(e) {
    this.onStart(e.touches[0]);
    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd, { passive: false });
    e.preventDefault();
  }

  onTouchMove(e) {
    this.onMove(e.touches[0]);
    e.preventDefault();
  }

  onTouchEnd(e) {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    this.props.onStop && this.props.onStop(this.state.x, this.state.y);
    e.preventDefault();
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          left: this.state.x,
          top: this.state.y,
          touchAction: 'none',
          zIndex: this.props.zIndex
        }}
        ref={div => {
          this.parentDiv = div;
        }}
        className="draggable"
      >
        {this.props.child}
      </div>
    );
  }
}

Draggable.propTypes = {
  onMove: PropTypes.func,
  onStop: PropTypes.func,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  gridX: PropTypes.number,
  gridY: PropTypes.number,
  child: PropTypes.element.isRequired,
  zIndex: PropTypes.number
};

export default Draggable;
