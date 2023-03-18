const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;
const { testConnection } = require('../helpers/connection_multi_mongodb');

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCheckPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {}
};

module.exports = testConnection.model('User', userSchema);
