const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketRoutes = require("./routes/socketRoutes");  // Import routes

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/socketDB");

mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB via Mongoose");
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Use the routes with a common base path, e.g., /api
app.use("/api", socketRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
