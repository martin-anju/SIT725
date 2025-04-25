const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketRoutes = require("./routes/socketRoutes");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/socketDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("✅ Connected to MongoDB via Mongoose");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/api", socketRoutes);

// Only start server if this file is run directly:
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
}

module.exports = app;
