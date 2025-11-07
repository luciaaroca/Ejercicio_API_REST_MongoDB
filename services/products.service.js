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
  saveProduct
};