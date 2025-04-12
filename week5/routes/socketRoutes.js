const express = require("express");
const router = express.Router();

// Import the socket controller
const socketController = require("../controllers/socketController");

// Define routes for socket operations
router.get("/sockets", socketController.getSockets);
router.post("/sockets", socketController.postSocket);

module.exports = router;
