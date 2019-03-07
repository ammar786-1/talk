import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import {
  addRooms,
  openWindow,
  setActiveWindow,
  setRooms,
  setUsername
} from '../../redux/actions';
import appReducer from '../../redux/appReducer';
import firebase from '../../services/firebase';
import storage from '../../services/localstorage';
import Window from '../Window/Window';
import './App.css';
import NewRoomModal from './NewRoomModal';
import RoomList from './RoomList';
import UsernameModal from './UsernameModal';

export default function App() {
  const initialState = {
    username: '',
    rooms: [],
    windows: [],
    activeWindow: null
  };
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [newRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const [usernameModalOpen, setUsernameModalOpen] = useState(true);

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
        dispatch(setRooms(rooms));
        closeNewRoomModal();
      });
    });
  }

  function closeNewRoomModal() {
    setNewRoomModalOpen(false);
  }

  function addWindow({ key }) {
    if (!state.windows.includes(key)) {
      dispatch(openWindow(key));
    }
    dispatch(setActiveWindow(key));
  }

  function onWindowInteraction(roomKey) {
    dispatch(setActiveWindow(roomKey));
  }

  function renderWindows() {
    console.log('renderWindows', state.windows);
    return state.windows.map(key => {
      return (
        <Window
          key={key}
          roomKey={key}
          isActive={state.activeWindow === key}
          onInteraction={() => onWindowInteraction(key)}
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
      <div>
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
        </Grid>
        <div>
          <div className="bottom-wrapper">
            <div className="flex-wrapper">{renderWindows()}</div>
          </div>
          <NewRoomModal
            open={newRoomModalOpen}
            onAdd={addNewRoom}
            onCancel={closeNewRoomModal}
          />
        </div>
      </div>
    );
  }
}
