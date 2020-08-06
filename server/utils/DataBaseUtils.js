import mongoose from 'mongoose';
import '../models/User.js';
import '../models/Room.js';
import '../models/Message.js';

const User = mongoose.model('User');
const Room = mongoose.model('Room');
const Message = mongoose.model('Message');

// функции для работы с БД

export function setUpConnection() {
  mongoose.connect(`mongodb://localhost/chat`); // TODO вынести в config
}

export function listUsers() {
  return User.find();
}

export function createUser(data) {
  const user = new User({
    name: data.name,
    updatedAt: new Date(),
  });

  return user.save();
}

export function deleteUser(id) {
  return User.findById(id).remove();
}

export function listRooms(userId) { // userId ?получение списка комнат для пользователя : получение всего списка комнат
  return userId ? Room.find({
    "users": {
      "$elemMatch": {
        "_id": userId
      }
    }
  }) : Room.find();
}

export function createRoom(data) {
  const room = new Room({
    name: data.name,
    users: [
      {
        _id: data.id,
        name: data.userName,
        status: 'offline'
      }
    ],
  });

  return room.save();
}

export function updateRoom(data) { // добавляем пользователя в команту
  const user = {
    _id: data.userId,
    name: data.name,
    status: data.status,
  }
  return Room.findByIdAndUpdate(data.id, { $push: { users: user } }).then(() => Room.findById(data.id));
}

export function updateStatus(data) { // обновление статуса пользователя в комнате
  const roomId = data.roomId;
  const userId = data.userId;
  const status = data.status;
  return Room.findOne({
    "_id": roomId, "users": {
      "$elemMatch": {
        "_id": userId
      }
    }
  }).then((data) => { // не получилось просто обновить статус у пользователя с использованием метода findOneAndUpdate, поэтому кодом создавал данные
    let index = 0;
    data.users.forEach((item, curIndex) => {
      if (item._id === userId) {
        index = curIndex;
      }
    });
    data.users[index].status = status;
    return Room.findOneAndUpdate({
      "_id": roomId, "users": {
        "$elemMatch": {
          "_id": userId
        }
      }
    }, { $set: { "users": data.users } });
  }).then((data) => Room.findById(roomId)); // findByID чтобы вернуть обновленный документ
}

export function deleteRoom(id) {
  return Room.findById(id).remove();
}

export function listMessages(roomId) {
  return roomId ? Message.find({ "room": roomId }) : Message.find();
}

export function createMessage(data) {
  const message = new Message({
    text: data.text,
    createdAt: new Date(),
    author: data.userName,
    room: data.roomId,
  });

  return message.save();
}