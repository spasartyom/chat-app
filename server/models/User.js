import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  updatedAt: { type: Date },
});

const User = mongoose.model('User', UserSchema); // создаем модель User