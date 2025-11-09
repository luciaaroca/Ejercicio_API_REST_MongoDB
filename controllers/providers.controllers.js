const providersService = require('../services/providers.service');

//GET -> todos los providers LEER
//http://localhost:3000/api/providers
const getAllproviders = async (req, res) => {
    try {
        const providers = await providersService.obtenerTodosLosProviders();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

//POST -> enviar body datos del proveedor CREAR
//http://localhost:3000/api/providers
/*Ejemplo a introducir por el body (cambiar datos):
{
  "companyName": "Talón de Aquiles",
  "url_web": "https://www.librosAquiles.com",
   "address": "Calle Margarita",
   "cif":"G40277884"
 } */
const postProvider = async(req,res) => {

    try{
        const nuevoProvider = await providersService.createProvider(req.body) //nuevo Provider-> espera la funcion de crear provider de services-> indica que se pasa el nuevo modelo por el body (req.body)
        res.status(201).json({message:"proveedor creado",
             provider : nuevoProvider});
    }catch(error){
      
        res.status(500).json({ mensaje: error.message });
    }
};

//PUT ->enviar por el body datos a EDITAR (id por url-params)
//http://localhost:3000/api/providers/companyName
const putProvider = async (req,res) => {
    try{
         const providerActualizado = await providersService.updateProvider(req.params.companyName, req.body);
        if (providerActualizado) {
            res.status(200).json({
            message:"Proveedor actualizado ", 
            updateProvider: providerActualizado   
            });
        } else {
            res.status(404).json({ mensaje: 'Provider no encontrado' });
        }
    }catch(error){
        res.status(500).json({ mensaje: error.message });
    }
}

//DELETE -> ELIMINAR un provider
//http://localhost:3000/api/providers/id
 const deleteProvider = async (req, res) => {
    try {
        const { proveedorEliminado, productosDesvinculados } = await providersService.eliminarProvider(req.params.id);
        res.status(200).json({
            message: `Proveedor eliminado correctamente`,
            proveedorEliminado,
            productosDesvinculados
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
} 


module.exports = {
getAllproviders,
postProvider,
putProvider,
deleteProvider
};