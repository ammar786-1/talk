import React, { useEffect, useReducer, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import {
  addRooms,
  closeWindow,
  openWindow,
  setActiveWindow,
  setRooms,
  setUsername
} from '../../redux/actions/appActions';
import { appReducer } from '../../redux/reducers';
import firebase from '../../services/firebase';
import storage from '../../services/localstorage';
import Window from '../Window/Window';
import './App.css';
import NewRoomModal from './NewRoomModal';
import RoomList from './RoomList';
import UsernameModal from './UsernameModal';

export const initialState = {
  username: '',
  rooms: [],
  windows: [],
  activeWindow: null
};

export default function App() {
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
    if (state.activeWindow !== roomKey) {
      dispatch(setActiveWindow(roomKey));
    }
  }

  function onCloseWindow(roomKey) {
    dispatch(closeWindow(roomKey));
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
          username={state.username}
          onCloseWindow={onCloseWindow}
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
              <div className="container">
                <Button primary onClick={() => setNewRoomModalOpen(true)}>
                  New room
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">Room List</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <div className="container">
                <RoomList rooms={state.rooms} onItemClick={addWindow} />
              </div>
            </Grid.Column>
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
