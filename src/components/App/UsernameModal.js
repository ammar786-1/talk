import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Button, Input, Modal } from 'semantic-ui-react';

export default function UsernameModal(props) {
  const inputRef = useRef(null);

  return (
    <Modal size="mini" open={props.open}>
      <Modal.Header>New username</Modal.Header>
      <Modal.Content>
        <Input size="medium" placeholder="User name" ref={inputRef} focus />
      </Modal.Content>
      <Modal.Actions>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Set"
          onClick={() =>
            props.setUsername &&
            props.setUsername(inputRef.current.inputRef.value)
          }
        />
      </Modal.Actions>
    </Modal>
  );
}

UsernameModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setUsername: PropTypes.func
};
