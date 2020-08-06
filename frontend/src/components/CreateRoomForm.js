import React from 'react';
import axios from 'axios';

export default class CreateRoomForm extends React.Component {
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
    axios.post(`http://localhost:8080/rooms`, {
      name: this.state.value,
      id: localStorage.getItem('id'),
      userName: localStorage.getItem('name')
    }).then((data) => {
      this.props.addRoom(data);
    });
    this.setState({ value: '' });
  };

  render() {
    return (
      <form method="POST" action="/" onSubmit={this.handleSubmit}>
        <div className="row mb-1 pt-1">
          <div className="col-9">
            <input type="text" value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Create Chat Room" />
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary">+</button>
          </div>
        </div>
      </form >
    );
  }
}