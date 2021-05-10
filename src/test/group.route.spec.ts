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

describe("Group api ", () => {
  describe("GET", () => {
    it("get all groups", (done) => {
      chai
        .request(app)
        .get("/api/group/all")
        .then(({ body }) => {
          assert.instanceOf(body, Array);
          done();
        })
        .catch(done);
    });

    it("get specific group", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=groupName&value=leibman")
        .then(({ body }) => {
          assert.equal(body.groupName, "leibman");
          done();
        })
        .catch(done);
    });

    it("get hierarchy of a group", (done) => {
      chai
        .request(app)
        .get("/api/group/leibman/all")
        .then(({ body, status }) => {
          assert.equal(status, 200);
          assert.equal(body.groupName, "leibman");
          assert.equal(body.groups.length, 2);
          assert.equal(body.groups[0].persons[0].firstName, "menahem");
          assert.equal(body.groups[1].persons[0].firstName, "chaim");
          assert.equal(body.persons.length, 2);
          done();
        })
        .catch(done);
    });

    it("get is person in a group SUCCESS", (done) => {
      chai
        .request(app)
        .get("/api/group/person/menahem/ingroup/leibmanM")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.person.firstName, "menahem");
          assert.equal(res.body.group.groupName, "leibmanM");
          done();
        })
        .catch(done);
    });

    it("get is person in a group FAIL", (done) => {
      chai
        .request(app)
        .get("/api/group/person/menahem/ingroup/leibmanG")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "menahem doesn't exists in leibmanG");
          assert.deepEqual(res.body, {});
          done();
        })
        .catch(done);
    });

    it("get group by key value (groupName)", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=groupName&value=leibman")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body.groupName, "leibman");
          done();
        })
        .catch(done);
    });

    it("get group by key value (groupName) fail", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=groupname&value=leibman")
        .then((res) => {
          assert.equal(res.status, 400);
          assert.equal(res.text, "no group in groupname => leibman.");
          done();
        })
        .catch(done);
    });

    it("get group by key value (parentGroup)", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=parentGroup&value=60939c25559b0d03ac4527c2")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.groupName, "12");
          done();
        })
        .catch(done);
    });

    it("get group by key value (parentGroup)", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=parentGroup&value=60939c25559b0d03ac4527c2")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.notEqual(res.body.groupName, "11");
          done();
        })
        .catch(done);
    });

    it("get group by key value (parentGroup) fail", (done) => {
      chai
        .request(app)
        .get("/api/group/fields?key=parentGroup&value=11")
        .then((res) => {
          assert.equal(res.status, 400);
          assert.notEqual(res.body.groupName, "no group in parentGroup => 11.");
          done();
        })
        .catch(done);
    });
  });

  describe("POST", () => {
    it("create group with parent", (done) => {
      chai
        .request(app)
        .post("/api/group/create/test/parent/1")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.groupName, "test");
          assert.equal(res.body.parentGroup, "6092cf870945d84aa021553d");
          done();
        })
        .catch(done);
    });

    it("create group with parent .fail", (done) => {
      chai
        .request(app)
        .post("/api/group/create/test1/parent/test2")
        .then((res) => {
          assert.equal(
            res.text,
            "Can't create group test1. TypeError: Cannot read property '_id' of null"
          );
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });

    it("create group without parent", (done) => {
      chai
        .request(app)
        .post("/api/group/create/test10")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.groupName, "test10");
          assert.notTypeOf(res.body.parentGroup, "string");
          done();
        })
        .catch(done);
    });

    it("create group without parent. fail", (done) => {
      chai
        .request(app)
        .post("/api/group/create/test10")
        .then((res) => {
          assert.equal(res.status, 400);
          assert.include(res.text, "Can't create group test10");
          done();
        })
        .catch(done);
    });

    it("insert group under parent group ", (done) => {
      chai
        .request(app)
        .post("/api/group/insert/test10/to/test")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.child.parentGroup, res.body.target._id);
          done();
        })
        .catch(done);
    });

    it("move group under another parent group ", (done) => {
      chai
        .request(app)
        .post("/api/group/move/test10/to/test")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.child.parentGroup, res.body.target._id);
          done();
        })
        .catch(done);
    });

    it("insert group under parent group fail", (done) => {
      chai
        .request(app)
        .post("/api/group/insert/test/to/test10")
        .then((res) => {
          assert.equal(res.body.error, "group already has parent group");
          done();
        })
        .catch(done);
    });

    it("change name of group", (done) => {
      chai
        .request(app)
        .patch("/api/group/change/name/test/toName/test11")
        .then((res) => {
          assert.equal(res.body.groupName, "test11");
          done();
        })
        .catch(done);
    });

    it("change name of group. fail", (done) => {
      chai
        .request(app)
        .patch("/api/group/change/name/test11/toName/test10")
        .then((res) => {
          assert.equal(res.status, 400);
          done();
        })
        .catch(done);
    });
  });

  describe("DELETE", () => {
    it("delete group with parent", (done) => {
      chai
        .request(app)
        .delete("/api/group/delete/test10")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body[0].groupName, "test10");
          assert.typeOf(res.body[0].parentGroup, "string");
          done();
        })
        .catch(done);
    });

    it("delete group", (done) => {
      chai
        .request(app)
        .delete("/api/group/delete/test11")
        .then((res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body[0].groupName, "test11");
          done();
        })
        .catch(done);
    });

    it("delete group and child", (done) => {
      chai
        .request(app)
        .post("/api/group/create/testDel")
        .then(() => {
          chai
            .request(app)
            .post("/api/group/create/testDelChild/parent/testDel")
            .then(() => {
              chai
                .request(app)
                .delete("/api/group/delete/testDel")
                .then((res) => {
                  assert.equal(res.status, 200);
                  assert.equal(res.body[0].groupName, "testDel");
                  assert.equal(res.body[1].groupName, "testDelChild");
                  done();
                });
            });
        })
        .catch(done);
    });
  });
});
