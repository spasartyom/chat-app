import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './Header.js';
import Login from './Login.js';
import Main from './Main.js';
import ChatsRooms from './ChatsRooms.js';

// import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    const userName = localStorage.getItem('name');
    this.state = {
      isAuth: userName ? true : false,
    };
  }

  auth = () => {
    this.setState({ isAuth: true })
  }

  render() {
    const isAuth = this.state.isAuth; //true - залогинен, false - не залогинен
    // "авторизация" основана на хранении id и userName в localStorage
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/login" render={() => isAuth ? (<Redirect to={{ pathname: "/" }} />) : (<Login auth={this.auth} />)} />
          <Route path="/room/:id" exact render={(props) => !isAuth ? (<Redirect to={{ pathname: "/login" }} />) : (<Main {...props} />)} />
          <Route path="/" render={() => !isAuth ? (<Redirect to={{ pathname: "/login" }} />) : (<ChatsRooms />)} />
        </Switch>
      </Router>
    );
  };
}

export default App;
