import React from 'react';
import User from './User.js';

const Users = (props) => {
  //для отображения пользователей в чате, оставляем пользователей со статусом online
  return (
    <div className="col-3" style={{ background: '#b1b1f5', outline: '1px solid aliceblue' }}>
      <h5>Users in {props.room}</h5>
      {props.users ? props.users.filter((user) => user.status === 'online').map((user) => {
        return <User key={user._id} name={user.name} status={user.status} />;
      }) : null}
    </div>
  )
};

export default Users;