const productsService = require('../services/products.service');

//GET -> todos los products LEER
//http://localhost:3000/api/products
//
const getAllproducts = async (req, res) => {
    try {
        const products = await productsService.obtenerTodosLosProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

//POST -> crear un product nuevo
//http://localhost:3000/api/products
/*Ejemplo de product a enviar por el body:
(cambiar datos)
{
  "id":6,
  "title": "Mini cajero",
  "price": 400,
  "description":"Mini cajero gasolinera",
  "providerId": "69108ebffa9fd1f6c4d43091"
}
*/ 
const postProduct = async (req, res) => {
  try {
    const product = await productsService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};






//PUT -> editar product
//http://localhost:3000/api/products/_id(objectID)
/*Ejemplo de uso:
-url ejemplo(req.params): http://localhost:3000/api/products/6910dabef445fd54880f33ac
-body jeemplo (req.body):

{
  "id":6,
  "title": "Mini cajero editando",
  "price": 400,
  "description":"Mini cajero gasolinera",
  "providerId": "69108ebffa9fd1f6c4d43092"
}
*/

const putProduct = async (req, res) => {
  try {
    const product = await productsService.updateProduct(req.params.id, req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

//DELETE

const deleteProduct = async (req,res) =>{
    try{
        const productDeleted = await productsService.borrarProducto(req.params.id)
        if(productDeleted){
            res.status(200).json({message: "Producto eliminado", Producto : productDeleted })
        }else{

            res.status(404).json({ message: "NO se ha encontrado ningún product con ese ID"});
        }
    }catch(error){
         res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
getAllproducts,
postProduct,
putProduct,
deleteProduct
};