/**
 * Credit: https://stackoverflow.com/a/49348134/1436766
 */

import { useEffect, useState } from 'react';

function useDraggable(node, handle, initialX, initialY, gridX, gridY) {
  const [relX, setRelX] = useState(0);
  const [relY, setRelY] = useState(0);
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);
  gridX = gridX || 1;
  gridY = gridY || 1;
  // console.log(relX, relY);

  useEffect(
    () => {
      node = node.current;
      handle = handle.current;
      handle = handle ? handle : node;
      handle.addEventListener('mousedown', e => {
        onMouseDown.call(
          null,
          e,
          document,
          node,
          relX,
          relY,
          setRelX,
          setRelY,
          x,
          y,
          setX,
          setY,
          gridX,
          gridY
        );
      });
      handle.addEventListener('touchstart', e =>
        onTouchStart.call(
          null,
          e,
          document,
          node,
          relX,
          relY,
          setRelX,
          setRelY,
          x,
          y,
          setX,
          setY,
          gridX,
          gridY
        )
      );
    },
    () => {
      handle.removeEventListener('mousedown', onMouseDown);
      handle.removeEventListener('touchstart', onTouchStart);
    }
  );

  return {
    x: x,
    y: y
  };
}

function onStart(e, node, relX, relY, setRelX, setRelY) {
  // const ref = ReactDOM.findDOMNode(node);
  console.log('onStart', relX, relY);
  const body = document.body;
  const box = node.getBoundingClientRect();
  setRelX(e.pageX - (box.left + body.scrollLeft - body.clientLeft));
  setRelY(e.pageY - (box.top + body.scrollTop - body.clientTop));
}

function onMouseDown(
  e,
  document,
  node,
  relX,
  relY,
  setRelX,
  setRelY,
  x,
  y,
  setX,
  setY,
  gridX,
  gridY
) {
  if (e.button !== 0) return;
  onStart(e, node, relX, relY, setRelX, setRelY);
  document.addEventListener('mousemove', e =>
    onMouseMove.call(null, e, relX, relY, x, y, setX, setY, gridX, gridY)
  );
  document.addEventListener('mouseup', e => onMouseUp.call(null, e, document));
  e.preventDefault();
}

function onTouchStart(
  e,
  document,
  node,
  relX,
  relY,
  setRelX,
  setRelY,
  x,
  y,
  setX,
  setY,
  gridX,
  gridY
) {
  onStart(e.touches[0], node, relX, relY, setRelX, setRelY);
  document.addEventListener(
    'touchmove',
    e => onTouchMove.call(null, e, relX, relY, x, y, setX, setY, gridX, gridY),
    { passive: false }
  );
  document.addEventListener('touchend', e => onTouchEnd(null, e, document), {
    passive: false
  });
  e.preventDefault();
}

function onMouseMove(e, relX, relY, x, y, setX, setY, gridX, gridY) {
  onMove(e, relX, relY, x, y, setX, setY, gridX, gridY);
  e.preventDefault();
}

function onTouchMove(e, relX, relY, x, y, setX, setY, gridX, gridY) {
  onMove(e.touches[0], relX, relY, x, y, setX, setY, gridX, gridY);
  e.preventDefault();
}

function onMove(e, relX, relY, x, y, setX, setY, gridX, gridY) {
  const _x = Math.trunc((e.pageX - relX) / gridX) * gridX;
  const _y = Math.trunc((e.pageY - relY) / gridY) * gridY;
  if (_x !== x || _y !== y) {
    //console.log(_x, _y);
    setX(_x);
    setY(_y);
  }
}

function onMouseUp(e, document) {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
  e.preventDefault();
}

function onTouchEnd(e, document) {
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
  e.preventDefault();
}

export default useDraggable;
