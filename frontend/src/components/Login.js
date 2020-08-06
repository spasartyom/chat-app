import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
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
    axios.post(`http://localhost:8080/users`, { // отправляем запрос на создание пользователя
      name: this.state.value,
    }).then(({ data }) => { // успех ? добавляем в localStorage данные о пользователе
      localStorage.setItem('id', data._id);
      localStorage.setItem('name', data.name);
      this.props.auth();
    }).catch((err) => console.log(err));

    this.setState({ value: '' });
  };

  render() {
    return (
      <div className="mx-auto" style={{
        width: '350px'
      }}>
        <p>Чтобы начать пользоваться приложением, необходимо ввести nickname</p>
        <form method="POST" action="/" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nickname</label>
            <input type="text" value={this.state.value} className="form-control" onChange={this.handleChange} placeholder="Enter nickname" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div >
    );
  };
};