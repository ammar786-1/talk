import PropTypes from 'prop-types';
import React from 'react';
import { Button, List } from 'semantic-ui-react';

export default function RoomList(props) {
  return (
    <List className="roomList" horizontal>
      {props.rooms &&
        props.rooms.map(r => {
          return (
            <List.Item key={r.key}>
              <Button
                color="green"
                onClick={() => props.onItemClick && props.onItemClick(r)}
              >
                {r.title}
              </Button>
            </List.Item>
          );
        })}
    </List>
  );
}

RoomList.propTypes = {
  rooms: PropTypes.array,
  onItemClick: PropTypes.func
};
