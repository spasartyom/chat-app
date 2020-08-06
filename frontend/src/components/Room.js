import React from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

const Room = (props) => {
  return (
    <div className="mb-1 room" style={{ fontSize: '21px', borderBottom: '1px solid aliceblue' }}>
      <Link to={`/room/${props.idRoom}`} > {props.name}</Link>
    </div>
  );
};

export default Room;