// /controllers/socketController.js

const Socket = require("../models/socketModel");

// Controller method for getting all socket locations
exports.getSockets = async (req, res) => {
  try {
    const sockets = await Socket.find({});
    res.json({ statusCode: 200, data: sockets, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving sockets", error: err });
  }
};

// Controller method for posting a new socket location
exports.postSocket = async (req, res) => {
  try {
    const newSocket = new Socket(req.body);
    await newSocket.save();
    res.json({ statusCode: 201, message: "Socket location added!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding socket", error: err });
  }
};
