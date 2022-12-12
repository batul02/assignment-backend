let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

chai.should();

chai.use(chaiHttp)

describe("/GET data by email /findemail/:email", function () {
    it("it should GET all the data from Books and Magazines by email of the author", (done) => {
        const email = "null-gustafsson@echocat.org";
        chai.request(server)
            .get("/findemail/" + email)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })

    });
    it("it should GET all the data from Books or Magazines by isbn", (done) => {
        const isbn = "1215-4545-5895";
        chai.request(server)
            .get("/find/" + isbn)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
            done();
            })

    });
});