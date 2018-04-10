// describe("GET /user", () => {
//   it("should return a success", () => {
//     var agent = chai.request.agent(server);
//     return agent
//       .post("/auth/login")
//       .send({
//         username: "jeremy",
//         password: "johnson123"
//       })
//       .then(function(res) {
//         return agent
//           .get("/user")
//           .then(function(res) {
//             res.redirects.length.should.eql(0);
//             res.status.should.eql(200);
//             res.type.should.eql("application/json");
//             res.body.status.should.eql("success");
//           })
//           .catch(err => {
//             // console.log(err)
//             throw new Error("should not fail");
//           });
//       });
//   });
// });

// describe("GET /admin", () => {
//   it("should return a success", () => {
//     var agent = chai.request.agent(server);
//     return agent
//       .post("/auth/login")
//       .send({
//         username: "kelly",
//         password: "bryant123"
//       })
//       .then(function(res) {
//         return agent
//           .get("/admin")
//           .then(function(res) {
//             res.redirects.length.should.eql(0);
//             res.status.should.eql(200);
//             res.type.should.eql("application/json");
//             res.body.status.should.eql("success");
//           })
//           .catch(err => {
//             throw new Error("should not fail");
//           });
//       });
//   });

//   it("should throw an error if a user is not an admin", () => {
//     var agent = chai.request.agent(server);
//     return agent
//       .post("/auth/login")
//       .send({
//         username: "jeremy",
//         password: "johnson123"
//       })
//       .then(function(res) {
//         return agent
//           .get("/admin")
//           .then(function(res) {
//             res.redirects.length.should.eql(0);
//             res.status.should.eql(401);
//             res.type.should.eql("application/json");
//             res.body.status.should.eql("You are not authorized");
//           })
//           .catch(err => {
//             console.log(err);
//             throw new Error("should not fail");
//           });
//       });
//   });
// });
