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

const createProduct = async (productData) => {
  const { id, title, price, description, providerId} = productData;

  // 1. Buscar proveedor
  const provider = await Provider.findById(providerId);
  if (!provider) {
    throw new Error('Proveedor no encontrado');
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

const updateProduct = async (productId, updateData) => {
  // Si quieren cambiar el proveedor, verificar que exista
  if (updateData.providerId) {
    const provider = await Provider.findById(updateData.providerId);//buscar 
    if (!provider) {
      throw new Error('Proveedor no encontrado');
    }
    updateData.provider = provider._id; // asignamos el ObjectId
    delete updateData.providerId; // eliminamos providerId para evitar conflicto
  }

  // Buscar y actualizar el producto
  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true } // devuelve el documento actualizado
  ).populate('provider'); // opcional, para devolver los datos del proveedor

  if (!updatedProduct) {
    throw new Error('Producto no encontrado');
  }

  return updatedProduct;
};

module.exports = {
  saveProduct,
  obtenerTodosLosProducts,
  createProduct,
  updateProduct
};