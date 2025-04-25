const request = require("supertest");
const expect  = require("chai").expect;
const app     = require("../server");  // ← load the app

describe("📡 Locate a Socket API", function() {
  it("GET /api/sockets returns 200 with proper body", function(done) {
    request(app)
      .get("/api/sockets")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.include({ statusCode: 200, message: "Success" });
        expect(res.body.data).to.be.an("array");
        done();
      });
  });

  it("POST /api/sockets with valid payload returns statusCode 201", function(done) {
    const socket = { place: "Testville", details: "99 sockets available" };
    request(app)
      .post("/api/sockets")
      .send(socket)
      .set("Accept", "application/json")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.include({ statusCode: 201 });
        expect(res.body.message).to.include("added");
        done();
      });
  });

  it("GET /api/sockets includes the newly POSTed place", function(done) {
    const socket = { place: "IntegrationTest", details: "42 sockets available" };
    request(app)
      .post("/api/sockets")
      .send(socket)
      .set("Accept", "application/json")
      .end(() => {
        request(app)
          .get("/api/sockets")
          .end((err, res) => {
            const places = res.body.data.map(s => s.place);
            expect(places).to.include("IntegrationTest");
            done();
          });
      });
  });

  it("GET /api/does-not-exist returns 404", function(done) {
    request(app)
      .get("/api/does-not-exist")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });
});