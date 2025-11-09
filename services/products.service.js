const  Product = require('../models/products.model');
const Provider = require('../models/provider.model')


// Función para guardar un producto y enlazarlo con un proveedor existente
async function saveProduct(
  id,
  title,
  price,
  description,
  companyName //proveedor por su nombre (es más sencillo que un email)
  ) {
  const provider = await Provider.find({ companyName }); //busca proveedor por su nombre
  if (!provider) throw new Error("Proveedor no encontrado");
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


const obtenerTodosLosProducts = async () => {
    return products = await Product.find().populate("provider"); // populate para traer datos del proveedor
};

// const createProduct = async (datosProduct) => {
//     const product = new Product(datosProduct); //construimos un nuevo provider con el esquema de models -> incluyendo el parámetro datosProvider introducido por el usuario
//     return await product.save(); //guarda nuevo provider en la BBDD
// }

// const createProduct = async (id, title, price, description, companyName) => {
//   // Buscar proveedor por nombre
//   const provider = await Provider.findOne({ companyName });
//   if (!provider) throw new Error("Proveedor no encontrado");

//   // Crear producto con ObjectId del proveedor
//   const product = new Product({
//     id,
//     title,
//     price,
//     description,
//     provider: provider._id
//   });

//   //Guardar producto
//   const result = await product.save();
//   return result; // devolvemos el documento completo guardado
// };

const updateProduct = async (id,datosEditarProduct)=>{
    return await Product.findOneAndUpdate(  { id: id },datosEditarProduct, { new: true }); //Método de Mongoose que busca un documento por su ID y lo actualiza .findByIdAndUpdate()
}

// //lógica para que si eliminamos un proveedor -> en productos- provider :null
// const eliminarProvider = async (providerId) => {
//     const proveedor = await Provider.findById(providerId); //buscamos el parámetro id introducido por el usuario en providers
//     if (!proveedor) {
//          throw new Error("Proveedor no encontrado");
//       }
//         const resultadoUpdate = await Product.updateMany( //actualizar products.provider:null al borrarse un provider
//         { provider: providerId }, //si coincide con el id que pasa el usuario
//         { $set: { provider: null } }
//     );
//     //eliminamos proveedor
//     const proveedorEliminado = await Provider.findByIdAndDelete(providerId);

    
//     return {
//         proveedorEliminado,
//         productosDesvinculados: resultadoUpdate.modifiedCount
//     };
// };



module.exports = {
  saveProduct,
  obtenerTodosLosProducts,
  //createProduct
   updateProduct
};