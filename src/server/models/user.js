const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String },
  avatarUrl: String,
  token: String,
});

schema.set('toJSON', {
  getters: true,
  transform: (doc, ret) => {
    const res = ret;
    delete res.__v;
    delete res.password;
    return res;
  },
});

module.exports = mongoose.model('User', schema);
