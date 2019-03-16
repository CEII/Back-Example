// Import the dependencies for testing
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../server");

chai.use(chaiHttp);
chai.should();
describe("Swagger Doc", () => {
    describe("GET /", () => {
        // Test to get all students record
        it("should get the swagger", (done) => {
            chai.request(server)
                .get("/API/v1/swagger/json")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("object");
                    done();
                });
        });
    });
});
