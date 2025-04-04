const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection (use your Atlas connection string or local one)
mongoose.connect("mongodb://localhost:27017/socketDB");


mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB via Mongoose");
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Mongoose Schema for socket locations
const SocketSchema = new mongoose.Schema({
  place: String,
  details: String,
});

const Socket = mongoose.model("Socket", SocketSchema);

// GET all socket locations
app.get("/api/sockets", async (req, res) => {
  try {
    const sockets = await Socket.find({});
    res.json({ statusCode: 200, data: sockets, message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving sockets", error: err });
  }
});

// POST a new socket location
app.post("/api/sockets", async (req, res) => {
  try {
    const newSocket = new Socket(req.body);
    await newSocket.save();
    res.json({ statusCode: 201, message: "Socket location added!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding socket", error: err });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
