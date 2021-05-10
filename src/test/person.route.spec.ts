import chai, { assert } from "chai";
import chaiHttp from "chai-http";
import { close, connect } from "../dbConnect";
import app from "../app";

chai.should();

chai.use(chaiHttp);

before(async () => {
  await connect();
});

after(() => {
  close();
});

describe("Person api", () => {
  describe("GET", () => {
    it("get all", (done) => {
      chai
        .request(app)
        .get("/api/person/all")
        .then(({ body }) => {
          assert.instanceOf(body, Array);
          done();
        });
    });

    it("get group of person by person name", (done) => {
      chai
        .request(app)
        .get("/api/person/menahem/groups")
        .then(({ body }) => {
          assert.instanceOf(body, Array);
          done();
        });
    });

    it("get group of person by person name. fail (not exist name)", (done) => {
      chai
        .request(app)
        .get("/api/person/men/groups")
        .then(({ status }) => {
          assert.equal(status, 400);
          done();
        });
    });

    it("get person by name", (done) => {
      chai
        .request(app)
        .get("/api/person/name/menahem")
        .then(({ body }) => {
          assert.equal(body.firstName, "menahem");
          done();
        });
    });

    it("get person by name. fail (try with last name)", (done) => {
      chai
        .request(app)
        .get("/api/person/name/leibman")
        .then((res) => {
          assert.equal(res.status, 400);
          done();
        });
    });
  });

  describe("POST", () => {
    it("create person", (done) => {
      chai
        .request(app)
        .post("/api/person")
        .send({
          firstName: "tes",
          lastName: "tesL",
        })
        .then(({ body }) => {
          assert.equal(body.firstName, "tes");
          done();
        });
    });

    it("create person. fail(name exist)", (done) => {
      chai
        .request(app)
        .post("/api/person")
        .send({
          firstName: "tes",
          lastName: "tesL",
        })
        .then((res) => {
          assert.equal(res.text, `Can't add tes tesL`);
          assert.equal(res.status, 400);
          done();
        });
    });

    it("add person to group", (done) => {
      chai
        .request(app)
        .post("/api/person/toGroup")
        .send({
          firstName: "tes",
          groupName: "leibmanC",
        })
        .then(({ body }) => {
          assert.equal(body.groupName, "leibmanC");
          done();
        });
    });

    it("add person to group. fail(already in group)", (done) => {
      chai
        .request(app)
        .post("/api/person/toGroup")
        .send({
          firstName: "tes",
          groupName: "leibmanC",
        })
        .then(({ body, status }) => {
          assert.equal(body.msg, "Can't add tes to leibmanC");
          assert.equal(body.error, "person already in group");
          assert.equal(status, 400);
          done();
        });
    });
  });

  describe("PATCH", () => {
    it("change last name", (done) => {
      chai
        .request(app)
        .patch("/api/person/newLastName")
        .send({
          firstName: "tes",
          newLastName: "tesLL",
        })
        .then(({ body }) => {
          assert.equal(body.lastName, "tesLL");
          done();
        });
    });
  });

  describe("DELETE", () => {
    it("delete person from group. fail (not in group)", (done) => {
      chai
        .request(app)
        .delete("/api/person/fromGroup")
        .send({
          firstName: "tes",
          groupName: "1",
        })
        .then(({ body }) => {
          assert.equal(body.error, "person doe's not exists in this group");
          done();
        });
    });

    it("delete person from group. fail (person not exist)", (done) => {
      chai
        .request(app)
        .delete("/api/person/fromGroup")
        .send({
          firstName: "blabla",
          groupName: "1",
        })
        .then(({ body }) => {
          assert.equal(body.error, "person not exist");
          done();
        });
    });

    it("delete person", (done) => {
      chai
        .request(app)
        .delete("/api/person/name/tes")
        .then(({ body }) => {
          assert.equal(body.firstName, "tes");
          done();
        });
    });
  });
});
