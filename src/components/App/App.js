import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { addRooms, setUsername } from '../../redux/actions';
import talk, { initialState } from '../../redux/reducers';
import firebase from '../../services/firebase';
import storage from '../../services/localstorage';
import Window from '../Window/Window';
import './App.css';
import NewRoomModal from './NewRoomModal';
import RoomList from './RoomList';
import UsernameModal from './UsernameModal';

export default function App() {
  const [windows, setWindows] = useState({});
  const [activeWindow, setActiveWindow] = useState('');
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);
  // const [username, setUsername] = useState('');

  const [state, dispatch] = useReducer(talk, initialState);

  useEffect(() => {
    console.log('username effect called');
    const localStorageUsername = storage.getUsername();
    dispatch(setUsername(localStorageUsername));
    if (localStorageUsername) setUsernameModalOpen(false);
  }, []);

  useEffect(() => {
    console.log('rooms effect called');
    firebase.getRooms().then(rooms => dispatch(addRooms(rooms)));
  }, []);

  function addNewRoom(newRoomTitle) {
    if (!newRoomTitle || !newRoomTitle.trim()) return closeNewRoomModal();
    firebase.addRoom(newRoomTitle).then(() => {
      firebase.getRooms().then(rooms => {
        //TODO replace instead of add; dispatch(addRooms(rooms));
        closeNewRoomModal();
      });
    });
  }

  function closeNewRoomModal() {
    setNewRoomModalOpen(false);
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

  if (!state.username && usernameModalOpen) {
    return (
      <UsernameModal
        open={usernameModalOpen}
        setUsername={name => dispatch(setUsername(name))}
      />
    );
  } else {
    return (
      <Grid className="App">
        <Grid.Row>
          <Grid.Column>Welcome {state.username}</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button primary onClick={() => setNewRoomModalOpen(true)}>
              New room
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as="h3">Room List</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <RoomList rooms={state.rooms} onItemClick={addWindow} />
        </Grid.Row>
        {renderWindows()}
        <NewRoomModal
          open={newRoomModalOpen}
          onAdd={addNewRoom}
          onCancel={closeNewRoomModal}
        />
      </Grid>
    );
  }
}
