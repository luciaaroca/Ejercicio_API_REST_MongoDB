const mongoose = require("mongoose");
const Provider = require("./provider.model"); //para relacionar products y providers
require("../config/db_mongo"); // Conexión a BBDD MongoDB

//DEFINE ESQUEMA->cómo debe ser cada documento de la coleccion
const objectSchema = {
  id: {
    type: Number,
    required: true, 
    unique: true,//restricción (tiene que ser único)
  },
  title: {
    type: String,
    required: true,
    unique: true, //restricción (tiene que ser único)
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  provider: { //añadido de provider.model.js -> RELACIÓN ENTRE COLECCIONES
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true
  },
};

// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model("Product", productSchema);

// PARA CREAR RELACIÓN CON PROVIDER EN LA COLECCION PRODUCTS
async function saveProduct(
  id,
  title,
  price,
  description,
  companyName //proveedor por su nombre (es más sencillo que un email)
  ) {
  const provider = await Provider.find({ companyName }); //busca proveedor por su nombre
  const provider_id = provider[0]._id.toString(); //Obtienes su _id ->el identificador único

  const product = new Product({ //Creas un producto nuevo y le asignas ese provider_id
    id,
    title,
    price,
    description,
    provider: provider_id
  });

  const result = await product.save(); //guardamos enlace producto y proveedor
  console.log(result);
}

module.exports = {
  Product,
  saveProduct
}; // Exportar el modelo y la función para crear productos


//PRUEBAS
// saveProduct(
//   1,
//   "Tortilla de patatas",
//   1.5,
//   "Cafe jugosa del teatro",
//   "Teatro Marquina"
// );

/* //crear otro pruducto para la casa de las plantas
saveProduct(
  2,
  "Ensalada de tomate",
  2.5,
  "Cafe jugosa del teatro",
  "https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-1200x828.jpg",
  "La casa de las plantas"
);   */

// Insertar un producto

/* const p = new Product({
    id: 8,
    title: "Barrita tomate",
    price: 1.80,
    description: "Cafe jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.png"
}); */

// Guardar en la BBDD
/* p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err))


// Leer todo de la BBDD
Product.find({}).then(data=>console.log(data));
//Product.updateOne({id: 6}, {price: 2.00}).then(data=>console.log(data));
//Product.deleteOne({id: 6}).then(data=>console.log(data)); */

