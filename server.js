const express = require('express')

const cowsay = require("cowsay");
const app = express()
const port = 3000 //puerto de pruebas

//Para leer fichero .env
require('dotenv').config();

//Importamos Middlewares-error404
const error404 =require("./middlewares/error404");

//Importamos Middlewares-morgan
const morgan= require("./middlewares/morgan");
// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


//habilitar recepción de objetos de json por mi backend
//parsear el body entrante a json
//cada petición que reciba la convierte a objeto (se puede considerar un middleware)
app.use(express.json());


//HABILITAR RUTAS
    //const booksRoutes = require("./routes/books.routes"); //importamos los datos de books.routes

// API
// Rutas habilitadas
   //app.use("/api/books", booksRoutes); // Usar las rutas definidas en books.routes.js

app.use(error404); //manejo de rutas no encontradas (middleware)

app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:${port}`,
      f: "owl", // enstramos en nodemodules, cowsay, cows y podemos cambiar este nombre para elegir animalito
    })
  );
})