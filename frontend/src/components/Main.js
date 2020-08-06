import React from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import Chat from './Chat.js';
import Users from './Users.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      users: [],
      room: {},
    };
  }

  sendMessage = (data) => { //обновляем стейт для рендера сообщений, вызываем событие отправлено сообщение
    this.setState({ messages: [...this.state.messages, data] });
    this.socket.emit('SEND_MESSAGE', data)
  }

  async componentDidMount() {
    const idRoom = this.props.match.params.id;
    const dataForUpdateStatus = {
      roomId: idRoom,
      userId: localStorage.getItem('id'),
      status: "online"
    }
    const updateStatus = await axios.patch('http://localhost:8080/rooms', dataForUpdateStatus); // при входе в комнату обновляем статус пользователя на online 
    const resRoom = await axios.get('http://localhost:8080/rooms');
    const resMessages = await axios.get(`http://localhost:8080/messages?room=${idRoom}`);
    this.setState({
      room: resRoom.data.filter((item) => item._id === idRoom)[0],
      messages: resMessages.data,
      users: resRoom.data.filter((item) => item._id === idRoom)[0].users,
    })

    this.socket = io('localhost:8080');

    const addMessage = (data) => {
      this.setState({ messages: [...this.state.messages, data] }); //обновляем стейт для рендера сообщений
    };

    const updateUsers = (data) => { //обновляем стейт для рендера пользователей
      this.setState({
        users: [...this.state.users.filter((user) => user._id !== data.userId), {
          _id: data.userId,
          name: data.userName,
          status: data.status,
        }]
      })
    }

    this.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data); // слушаем событие получений сообщений, отрисовываем сообщения
    });

    this.socket.on('ROOM:JOIN:STATUS', function (data) {
      updateUsers(data); // слушаем событие присоединений к комнате, отрисовываем пользователей
    });

    this.socket.emit('ROOM:JOIN', {
      roomId: idRoom,
      userId: localStorage.getItem('id'),
      userName: localStorage.getItem('name'),
      status: "online",
    }); // инициируем событие присоединения к комнате
  }

  componentWillUnmount() {
    const idRoom = this.props.match.params.id;
    const dataForUpdateStatus = {
      roomId: idRoom,
      userId: localStorage.getItem('id'),
      status: "offline"
    };
    axios.patch('http://localhost:8080/rooms', dataForUpdateStatus); //при выходе из комнаты обновляем статус пользователя
    this.socket.emit('ROOM:EXIT', { ...dataForUpdateStatus, userName: localStorage.getItem('name') }); //инициируем событие выход из комнаты
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ height: '85vh' }}>
          <Chat messages={this.state.messages} sendMessage={this.sendMessage} />
          <Users users={this.state.users} room={this.state.room.name} />
          <div className="col-2">
            <Link to={`/`} >Назад</Link>
          </div>
        </div>
      </div>
    );
  };
};