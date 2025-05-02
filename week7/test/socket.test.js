const io = require("socket.io-client");
const server = require("../server");  // Import the server from server.js
const expect = require("chai").expect;

describe("Socket.IO server", function () {
  let socket;

  before(function (done) {
    // Start the server before tests
    server.listen(3000, () => {
      done();
    });
  });

  beforeEach(function (done) {
    // Connect the socket before each test
    socket = io("http://localhost:3000");
    socket.on("connect", done);
  });

  afterEach(function () {
    socket.disconnect();
  });

  it("should receive a random number every second", function (done) {
    socket.on("number", (msg) => {
      expect(msg).to.be.a("number");  // Check if the message is a number
      done();  // End the test
    });
  });
});
