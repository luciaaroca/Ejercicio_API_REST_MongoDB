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




//FUTURO GET
const obtenerTodosLosProducts = async () => {
    return products = await Product.find().populate("provider"); // populate para traer datos del proveedor
};

//FUTURO POST
const createProduct = async (productData) => {
  const { id, title, price, description, providerId} = productData;

  // 1. Buscar proveedor
  const provider = await Provider.findById(providerId);
  if (!provider) {
    throw new Error('No se pudo crear el product');
  }

  // 2. Crear producto
  const newProduct = new Product({
    id,
    title,
    price,
    description,
    provider: provider._id
  });

  // 3. Guardar
  const savedProduct = await newProduct.save();

  // 4. Devolver producto con proveedor incluido (opcional)
  return savedProduct.populate('provider');
};


//FUTURO PUT
const updateProduct = async (productId, updateData) => {//funcion que recibe: ID del producto /objeto con los datos que quieres modificar

  // Si quieren cambiar el proveedor, verificar que exista
  if (updateData.providerId) { //verificamos si el usuario envió un providerId
    const provider = await Provider.findById(updateData.providerId);//buscar en la colección providers un documento cuyo _id coincida con updateData.providerId.
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    updateData.provider = provider._id; //Ahora asignamos el ObjectId real del proveedor al campo provider del producto.
    delete updateData.providerId; // eliminamos providerId para evitar conflicto
  }

  // Buscar y actualizar el producto
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true } // devuelve el documento actualizado
  ).populate('provider'); //para devolver los datos del proveedor

  if (!updatedProduct) {
    throw new Error('Producto no encontrado');
  }

  return updatedProduct;
  };

//FUTURO DELETE
const borrarProducto = async (id)=>{
 return await Product.findByIdAndDelete(id);
}

module.exports = {
  saveProduct,
  obtenerTodosLosProducts,
  createProduct,
  updateProduct,
  borrarProducto
};