import React from 'react';
import { formatDistance } from 'date-fns'; //библиотека для вывода разницы во времени

const Message = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <span style={{ color: 'grey', fontSize: '14px' }}>{props.author}</span>
        <span style={{ color: 'grey', fontSize: '14px' }}>{formatDistance(new Date(props.createdAt), new Date())}</span>
      </div>
      <p style={{ fontSize: '21px' }}>{props.text}</p>
    </div>
  );
};

export default Message;