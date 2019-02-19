import React, { useEffect, useRef, useState } from 'react';
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
  const newRoomInputRef = useRef(null);
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    console.log('called');
    const localStorageUsername = storage.getUsername();
    setUsername(localStorageUsername);
    if (localStorageUsername) setUsernameModalOpen(false);
  }, [username]);

  useEffect(() => {
    console.log('called');
    firebase.getRooms().then(rooms => setRooms(rooms));
  }, [rooms.length]);

  function handleSetUsername() {
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
      <Modal
        size="mini"
        open={newRoomOpen}
        onMount={() => newRoomInputRef.current.focus()}
      >
        <Modal.Header>New room</Modal.Header>
        <Modal.Content>
          <Input size="medium" focus placeholder="Room name" ref={newRoomInputRef} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeNewRoomModal}>
            Cancel
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={addNewRoom}
          />
        </Modal.Actions>
      </Modal>
    );
  }

  function closeNewRoomModal() {
    setNewRoomOpen(false);
  }

  function addNewRoom() {
    if (!newRoomInputRef.current) return closeNewRoomModal();
    const newRoomName = newRoomInputRef.current.inputRef.value;
    if (!newRoomName || !newRoomName.trim()) return closeNewRoomModal();
    firebase.addRoom(newRoomName).then(() => {
      firebase.getRooms().then(rooms => {
        setRooms(rooms);
        closeNewRoomModal();
      });
    });
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
      <Button primary onClick={() => setNewRoomOpen(true)}>
        New room
      </Button>
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
