// Import the dependencies for testing
let server;
const userDummy  = require("../../API/v1/dummy/users");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Set up request
const req = userDummy.users[0];
let createdId = {};

// Configure chai
chai.use(chaiHttp);
chai.should();

before( (done) =>{
    server = require("../../server");
    done();
});

describe("Users UT", () => {
    describe("POST /", ()=>{
        //Wait for the callback of server to finish
        it("should make a new user", (done) =>{
            //req.profileImage = fs.readFileSync("./API/tests/usertest.jpg");
            chai.request(server)
                .post("/API/v1/users/")
                //.header("Access-Token", token)
                //.header("API-Key", apiKey)
                //To send an attachment and a body is necessary to do this
                .send(req)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    //The response is encapsulated with another body
                    createdId._id = res.body.userData._id;
                    done();
                });
        });
        it("should fail to create with a used email or carnet", (done) =>{
            chai.request(server)
                .post("/API/v1/users/")
                .send(req)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("POST /", ()=>{
        it("should return a token", (done) =>{
            chai.request(server)
                .post("/API/v1/users/login")
                .send(req)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("token");
                    done();
                });
        });
    });
    describe("GET /", () => {
        // Test to get all students record
        it("should get all users record", (done) => {
            chai.request(server)
                .get("/API/v1/users/")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
    describe("GET /{id}", ()=>{
        // Test to get single student record
        it("should get a single user record", (done) => {
            const id = createdId._id;
            chai.request(server)
                .get(`/API/v1/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
        // Test to get single student record
        it("should not get a single user record", (done) => {
            //Example of a route
            const id = 1000;
            chai.request(server)
                .get(`/API/v1/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});
