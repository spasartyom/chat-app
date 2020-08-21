import React from 'react';
import axios from 'axios';
import Room from './Room.js';
import CreateRoomForm from './CreateRoomForm.js';
import JoinRoomForm from './JoinRoomForm.js';

export default class ChatsRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  addRoom = ({ data }) => {
    this.setState({ rooms: [...this.state.rooms, data] });
  };

  async componentDidMount() {
    const userId = localStorage.getItem('id');
    const res = await axios.get(`http://localhost:8080/rooms?id=${userId}`);
    this.setState({
      rooms: res.data,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-8 col-md-6 mx-auto" style={{ background: '#b1b1f5', outline: '1px solid aliceblue', height: '85vh' }}>
          <CreateRoomForm addRoom={this.addRoom} />
          <JoinRoomForm addRoom={this.addRoom} />
          {this.state.rooms ? this.state.rooms.map((room) => {
            return <Room key={room._id} name={room.name} idRoom={room._id} users={room.users} />;
          }) : null}
        </ div>
      </div>
    );
  };
};