// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");
const userDummy  = require("../../API/v1/dummy/users");
//Set up request
const req = userDummy.users[0];
let createdId = {};
// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Users UT", () => {
    describe("POST /", ()=>{
        it("should make a new user", (done) =>{
            chai.request(server)
                .post("/API/v1/users/")
                //.header("Access-Token", token)
                //.header("API-Key", apiKey)
                //To send an attachment and a body is necessary to do this
                .field("name", req.name)
                .field("lastname", req.lastname)
                .field("secret", req.secret)
                .field("accountStatus", req.accountStatus)
                .field("nickname", req.nickname)
                .field("contactEmail", req.contactEmail)
                .field("accessCode", req.accessCode)
                .field("accountIdentifier", req.accountIdentifier)
                .field("carnet", req.carnet)
                // Field Path Name
                .attach("profileImage", "./API/tests/usertest.jpg", "usertest.jpg")
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a("object");
                    //The response is encapsulated with another body
                    createdId._id = res.body.userData._id;
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
