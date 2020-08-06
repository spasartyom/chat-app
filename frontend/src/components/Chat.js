import React from 'react';
import Message from './Message.js';
import TextForm from './TextForm.js'
import './Chat.css';

//компанент для вывода сообщений и формы ввода текста
const Chat = (props) => {
  return (
    <div className="col-7 d-flex flex-column justify-content-between" style={{
      background: 'rgb(177 177 245 / 79%)', outline: '1px solid aliceblue', height: '85vh'
    }}>
      <div id="chatBlock" style={{ height: '75vh', overflowY: 'scroll' }}>
        {props.messages ? props.messages.map((message) => {
          return <Message key={message._id} text={message.text} createdAt={message.createdAt} author={message.author} />;
        }) : null}
      </div>
      <TextForm sendMessage={props.sendMessage} />
    </div>
  );
};

export default Chat;