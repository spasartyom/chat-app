import React from 'react';
import axios from 'axios';

export default class TextForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const roomId = document.location.href.split('/');
    axios.post(`http://localhost:8080/messages`, { //отправляем сообщение
      text: this.state.value,
      userName: localStorage.getItem('name'),
      roomId: roomId[roomId.length - 1]
    }).then((data) => {
      this.props.sendMessage(data.data); //отрисовываем сообщение, вызываем событие отправлено сообщение
    });
    this.setState({ value: '' });
  };


  render() {
    return (
      <form method="POST" action="/" onSubmit={this.handleSubmit}>
        <div className="row mb-3">
          <div className="col-9">
            <input type="text" value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Enter message" />
          </div>
          <div className="col-2">
            <button type="submit" className="btn btn-primary">Send</button>
          </div>
        </div>
      </form >
    );
  };
};