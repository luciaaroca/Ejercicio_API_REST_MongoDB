// // Supertest
// const supertest = require("supertest");
// // Server express
// const server = require("../server");
// // Conexión mongo. Lanza la BBDD
// const mongoose = require("../config/db_mongo");
// // Lanzar server con supertest --> npm start
// const request = supertest(server);

// // beforeEach
// // afterEach
// // beforeAll
// // afterAll

// afterAll(async () => {
//   // Cierra el servidor express
//   //await server.close();
//   // Cierra conexión de mongoose
//   await mongoose.connection.close();
// });

// it("Probando JEST", () => {
//   expect(1).toBe(1);
// });

// //GET
// describe("GET all providers", () => {
//   it("GET test api/providers should return 200", async () => {
//     await request.get("/api/providers").expect(200);
//   });

//   it("GET test /api/providers should return an array", async () => {
//     const response = await request.get("/api/providers").expect(200);
//     expect(response.body).toEqual(expect.any(Array));
//   });
// });


//POST

// describe("POST one providers", () => {
//     it("Se envia un provider y se espera que se guarde", (done) => {
//       request
//         .post("/api/providers")
//         .send({
//          companyName: "Talón de Aquiles",
//           url_web: "https://www.librosAquiles.com",
//           address: "Calle Margarita",
//           cif: "G40277884",
//         })
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           return done();
//         });
//     });
//     it("Falla al enviar un producto vacio", (done) => {
//       request
//         .post("/api/providers")
//         .send({})
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(500)
//         .end((err, res) => {
//           if (err) return done(err);
//           return done();
//         });
//     });
//     it("Falla al enviar un producto con un campo vacio", (done) => {   
//       request
//         .post("/api/providers")
//         .send({
//           companyName: "Talón de Aquiles",
//           url_web: "https://www.librosAquiles.com",
//           address: "",
//           cif: "G40277884",
//         })
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(500)
//         .end((err, res) => {
//           if (err) return done(err);
//           return done();
//         });
//     })

//     it("Falla al enviar un provider con tipo de datos incorrectos", (done) => { 
//         request
//             .post("/api/providers")
//             .send({
//             companyName: 0,
//             url_web: 0,
//             address: 0,
//             cif: 0,
//             })
//             .set("Accept", "application/json")
//             .expect("Content-Type", /json/)
//             .expect(500)
//             .end((err, res) => {
//             if (err) return done(err);
//             return done();
//             });
//         }); 
    
// });
