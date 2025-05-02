const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketRoutes = require("./routes/socketRoutes");
const http = require("http");

// Create Express app and HTTP server
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);  // HTTP server created

const io = require("socket.io")(server);  // Pass server to socket.io

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/socketDB");

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB via Mongoose");
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Use the routes for API
app.use("/api", socketRoutes);

// Socket connection handling
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));  // Emitting random number
  }, 1000);
});

// Export server so it can be used in tests
module.exports = server;
