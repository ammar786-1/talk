import React, { Component } from 'react';
import { Button, Grid, Header, List } from 'semantic-ui-react';
import Window1 from '../Window/Window.1';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: {},
      activeWindow: ''
    };
  }

  addWindow(room) {
    const w = this.state.windows[room.title];
    this.setState(prev => {
      const windows = { ...prev.windows };
      let window;
      if (w) {
        window = w;
      } else {
        window = {
          room: room
        };
        windows[room.title] = window;
      }
      return { windows: windows, activeWindow: room.title };
    });
  }

  layout() {
    return (
      <Grid columns={1} divided>
        <Grid.Row>
          <Grid.Column>
            <Button primary>New room</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  roomList() {
    const rooms = [
      {
        title: 'first',
        chats: ['this', 'is', 'chat', 'box']
      },
      {
        title: 'second',
        chats: ['this', 'is', 'chat', 'second']
      }
    ];
    return (
      <List className="roomList" horizontal>
        {rooms.map(r => {
          return (
            <List.Item key={r.title}>
              <Button color="green" onClick={this.addWindow.bind(this, r)}>
                {r.title}
              </Button>
            </List.Item>
          );
        })}
      </List>
    );
  }

  onWindowInteraction(w) {
    this.setState(prev => {
      const activeWindow = w.room.title;
      return { activeWindow: activeWindow };
    });
  }

  onChat(room, chat) {
    this.setState(prev => {
      const w = prev.windows[room.title];
      if (!w) return {};
      const newW = { ...w };
      newW.room.chats.unshift(chat);
      const windows = { ...prev.windows };
      windows[room.title] = newW;
      return {
        windows: windows
      };
    });
  }

  renderWindows() {
    return Object.entries(this.state.windows).map(([title, w]) => {
      return (
        <Window1
          key={title}
          room={w.room}
          isActive={this.state.activeWindow === title}
          onInteraction={this.onWindowInteraction.bind(this, w)}
          onChat={this.onChat.bind(this)}
        />
      );
    });
  }

  render() {
    return (
      <div className="App">
        {this.layout()}
        <Header as="h3">Room List</Header>
        {this.roomList()}
        {this.renderWindows()}
      </div>
    );
  }
}

export default App;
