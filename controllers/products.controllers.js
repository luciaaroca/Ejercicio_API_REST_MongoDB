const productsService = require('../services/products.service');

//GET -> todos los products LEER
//http://localhost:3000/api/products
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
// const postProduct = async (req, res) => {
//   try {
//     const { id, title, price, description, companyName } = req.body;

//     if (!id || !title || !price || !description || !companyName) {
//       return res.status(400).json({ message: "Faltan datos obligatorios" });
//     }

//     // Llamamos al servicio que crea el producto
//     const nuevoProducto = await productsService.saveProduct(
//       id,
//       title,
//       price,
//       description,
//       companyName
//     );

//     res.status(201).json({
//       message: "Producto creado",
//       product: nuevoProducto
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//PUT -> editar product
//http://localhost:3000/api/products/id

const putProduct = async (req,res) => {
    try{
         const productActualizado = await productsService.updateProduct(req.params.id, req.body);
        if (productActualizado) {
            res.status(200).json({
            message:"Product actualizado ", 
            updateProduct: productActualizado   
            });
        } else {
            res.status(404).json({ mensaje: 'Product no encontrado' });
        }
    }catch(error){
        res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
getAllproducts,
// postProduct
putProduct
};