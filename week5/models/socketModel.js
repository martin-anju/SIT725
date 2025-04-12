// /models/socketModel.js

const mongoose = require("mongoose");

const SocketSchema = new mongoose.Schema({
  place: String,
  details: String,
});

module.exports = mongoose.model("Socket", SocketSchema);
