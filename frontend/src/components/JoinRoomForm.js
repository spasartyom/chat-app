import React from 'react';
import axios from 'axios';

export default class JoinFormRoom extends React.Component {
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
    const ArrOfjoinHref = this.state.value.split('/');
    axios.put(`http://localhost:8080/rooms`, {
      id: ArrOfjoinHref[ArrOfjoinHref.length - 1],
      userId: localStorage.getItem('id'),
      name: localStorage.getItem('name'),
      status: "offline"
    }).then((data) => {
      this.props.addRoom(data);
    });
    this.setState({ value: '' });
  };

  render() {
    return (
      <form method="POST" action="/" onSubmit={this.handleSubmit}>
        <div className="row mb-1">
          <div className="col-9">
            <input type="text" value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Join Chat Room" />
          </div>
          <div className="col-1">
            <button type="submit" className="btn btn-primary">+</button>
          </div>
        </div>
      </form >
    );
  }
}