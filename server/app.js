import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import socket from 'socket.io';

import * as db from './utils/DataBaseUtils.js';

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: '*' }));

app.get('/users', (req, res) => {
  db.listUsers().then((data) => res.send(data));
})

app.post('/users', (req, res) => {
  db.createUser(req.body).then((data) => res.send(data));
})

app.delete('/users/:id', (req, res) => {
  db.deleteUser(req.params.id).then((data) => res.send(data));
})

app.get('/rooms', (req, res) => {
  const userId = req.query.id;
  db.listRooms(userId).then((data) => res.send(data));
})

app.post('/rooms', (req, res) => {
  db.createRoom(req.body).then((data) => res.send(data));
})

app.put('/rooms', (req, res) => {
  db.updateRoom(req.body).then((data) => res.send(data));
});

app.patch('/rooms', (req, res) => {
  db.updateStatus(req.body).then((data) => res.send(data));
})

app.delete('/rooms/:id', (req, res) => {
  db.deleteRoom(req.params.id).then((data) => res.send(data));
})

app.get('/messages', (req, res) => {
  const roomId = req.query.room;
  db.listMessages(roomId).then((data) => res.send(data));
})

app.post('/messages', (req, res) => {
  db.createMessage(req.body).then((data) => res.send(data));
})

app.delete('/messages/:id', (req, res) => {
  db.deleteMessage(req.params.id).then((data) => res.send(data));
})

const server = app.listen(8080, () => {
  console.log('server listening 8080 port');
});

const io = socket(server);

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', (data) => {
    socket.join(data.roomId); // присоединяемся к комнате
    socket.to(data.roomId).emit('ROOM:JOIN:STATUS', data); // отправляем данные слушателям данной комнаты, что мы присоединились
  });

  socket.on('SEND_MESSAGE', function (data) {
    socket.to(data.room).emit('RECEIVE_MESSAGE', data);// отправляем данные слушателям данной комнаты о новом сообщении
  });

  socket.on('ROOM:EXIT', (data) => {
    socket.to(data.roomId).emit('ROOM:JOIN:STATUS', data); // отправляем данные слушателям данной комнаты, что мы присоединились
    socket.leave(data.roomId); // покидаем комнату
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});