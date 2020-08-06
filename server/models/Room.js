import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  name: { type: String },
  users: [{ _id: { type: String }, name: { type: String }, status: { type: String } }],
});

const Room = mongoose.model('Room', RoomSchema); // создаем модель Room