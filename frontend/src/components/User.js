import React from 'react';

const User = (props) => {
  return (
    <div className="d-flex align-items-baseline" style={{ borderBottom: '1px solid aliceblue' }}>
      <div style={{ fontSize: '21px' }}>{props.name}</div>
      <span style={{ color: '#2cea2c', fontSize: '14px' }}>{props.status}</span>
    </div>
  );
};

export default User;