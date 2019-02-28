import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

export default function NewRoomModal(props) {
  const inputRef = useRef(null);
  return (
    <Modal
      size="mini"
      open={props.open}
      onMount={() => inputRef.current.focus()}
    >
      <Modal.Header>New room</Modal.Header>
      <Modal.Content>
        <Input size="medium" placeholder="Room name" ref={inputRef} focus />
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          content="Cancel"
          onClick={() => props.onCancel && props.onCancel()}
        />
        <Button
          positive
          content="Add"
          onClick={() =>
            props.onAdd && props.onAdd(inputRef.current.inputRef.value)
          }
        />
      </Modal.Actions>
    </Modal>
  );
}

NewRoomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func
};
