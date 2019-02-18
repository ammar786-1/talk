import React, { useEffect, useState } from 'react';
import { Button, Grid, Header, Input, List, Modal } from 'semantic-ui-react';
import firebase from '../../services/firebase';
import storage from '../../services/localstorage';
import Window from '../Window/Window';
import './App.css';

export default function App() {
  const [rooms, setRooms] = useState([]);
  const [windows, setWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState('');
  const [newRoomOpen, setNewRoomOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    const localStorageUsername = storage.getUsername();
    setUsername(localStorageUsername);
    if (localStorageUsername) setUsernameModalOpen(false);
    firebase.getRooms().then(rooms => setRooms(rooms));
  });

  function closeNewRoomModel(e) {
    setNewRoomOpen(false);
  }

  function handleSetUsername(e) {
    // user confirmed current value
    setUsername(tempUsername);
    storage.setUsername(tempUsername);
    setUsernameModalOpen(false);
  }

  function renderUsernameModal() {
    return (
      <Modal size="mini" open={usernameModalOpen}>
        <Modal.Header>New username</Modal.Header>
        <Modal.Content>
          <Input
            value={tempUsername}
            onChange={e => setTempUsername(e.target.value)}
            size="medium"
            focus
            placeholder="User name"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Set"
            onClick={handleSetUsername}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  function renderNewRoomModal() {
    return (
      <Modal size="mini" open={newRoomOpen} onClose={closeNewRoomModel}>
        <Modal.Header>New room</Modal.Header>
        <Modal.Content>
          <Input size="medium" focus placeholder="Room name" />
        </Modal.Content>
        <Modal.Actions>
          <Button negative>No</Button>
          <Button positive icon="checkmark" labelPosition="right" content="Yes" />
        </Modal.Actions>
      </Modal>
    );
  }

  function addWindow(room) {
    const w = windows[room.key];
    const tempWindows = { ...windows };
    let window;
    if (w) {
      window = w;
    } else {
      window = {
        room: room
      };
      tempWindows[room.key] = window;
    }
    setWindows(tempWindows);
    setActiveWindow(room.key);
  }

  function renderRoomList() {
    return (
      <List className="roomList" horizontal>
        {rooms.map(r => {
          return (
            <List.Item key={r.key}>
              <Button color="green" onClick={addWindow.bind(null, r)}>
                {r.title}
              </Button>
            </List.Item>
          );
        })}
      </List>
    );
  }

  function onWindowInteraction(roomKey) {
    setActiveWindow(roomKey);
  }

  function onChat(room, chat) {
    const w = windows[room.title];
    if (!w) return {};
    const newW = { ...w };
    newW.room.chats.unshift(chat);
    const tempWindows = { ...windows };
    tempWindows[room.title] = newW;
    setWindows(tempWindows);
  }

  function renderWindows() {
    return Object.entries(windows).map(([key, w]) => {
      return (
        <Window
          key={key}
          room={w.room}
          isActive={activeWindow === key}
          onInteraction={onWindowInteraction.bind(null, key)}
          onChat={onChat}
        />
      );
    });
  }

  function renderLayout() {
    return (
      <Grid columns={1} divided>
        <Grid.Row>
          <Grid.Column>
            <Button primary onClick={() => setNewRoomOpen(true)}>
              New room
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  if (!username && usernameModalOpen) {
    return renderUsernameModal();
  } else {
    return (
      <Grid className="App" columns="1">
        <Grid.Row>
          <Grid.Column>{renderLayout()}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Room List</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>{renderRoomList()}</Grid.Row>
        {renderWindows()}
        {renderNewRoomModal()}
      </Grid>
    );
  }
}
