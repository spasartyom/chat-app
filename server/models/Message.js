import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String },
  author: { type: String },
  createdAt: { type: Date },
  room: { type: String },
});

const Message = mongoose.model('Message', MessageSchema); // создаем модель Message