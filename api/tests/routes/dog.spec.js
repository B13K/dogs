/* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Dog, conn } = require('../../src/db.js');

// const agent = session(app);
// const dog = {
//   name: 'Pug',
// };

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
// });

const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn } = require("../../src/db.js");
const { Dog, Temperament } = conn.models;

const agent = session(app);


describe("Test routes", () => {
  before( () => conn.authenticate()
    .catch((err) => {
      console.error("Unable to connect to database: ", err);
    }
  ));

  describe("GET /dogs", () => {

    it("should get 200", () => 
      agent.get("/dogs")
           .expect(200)
    );

    it("Response with an array of Dogs", async () => {
      const res = await agent.get("/dogs")
      expect(res.body).to.be.an("array")
    })

    it("responds with an array of dogs, each with properties: id, name, weightMax, image", async () => {
      const res = await agent.get("/dogs")
      res.body.forEach( t => {
        expect(t).to.have.property("id")
        expect(t).to.have.property("name")
        expect(t).to.have.property("weightMax")
        expect(t).to.have.property("image")
      })

    })
    

  });

  describe("Get /temperaments", () => {
    it("should get 200", () => 
      agent.get("/temperaments")
           .expect(200)
    )

    it("Response with an array of Temperaments", async () => {
      const res = await agent.get("/temperaments")
      expect(res.body).to.be.an("array")
    })

    it("responds with an array of temperaments, each with properties: id, name", async () => {
      const res = await agent.get("/temperaments")
      res.body.forEach( t => {
            expect(t).to.have.property("id")
            expect(t).to.have.property("name")
          })
    })
  })
});