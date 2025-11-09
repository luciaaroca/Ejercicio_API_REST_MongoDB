const Provider = require("../models/provider.model");
const  Product = require('../models/products.model');

const obtenerTodosLosProviders = async () => {
    return await Provider.find();
};

const createProvider = async (datosProvider) => {
    const provider = new Provider(datosProvider); //construimos un nuevo provider con el esquema de models -> incluyendo el parámetro datosProvider introducido por el usuario
    return await provider.save(); //guarda nuevo provider en la BBDD
}

const updateProvider = async (companyName,datosEditarProvider)=>{
    return await Provider.findOneAndUpdate(  { companyName: companyName }, datosEditarProvider, { new: true }); //Método de Mongoose que busca un documento por su ID y lo actualiza .findByIdAndUpdate()
}

//lógica para que si eliminamos un proveedor -> en productos- provider :null
 const eliminarProvider = async (providerId) => {
    const proveedor = await Provider.findById(providerId); //buscamos el parámetro id introducido por el usuario en providers
    if (!proveedor) {
         throw new Error("Proveedor no encontrado");
      }
        const resultadoUpdate = await Product.updateMany( //actualizar products.provider:null al borrarse un provider
        { provider: providerId }, //si coincide con el id que pasa el usuario
        { $set: { provider: null } }
    );
    //eliminamos proveedor
    const proveedorEliminado = await Provider.findByIdAndDelete(providerId);

    
    return {
        proveedorEliminado,
        productosDesvinculados: resultadoUpdate.modifiedCount
    };
}; 



module.exports = {
    obtenerTodosLosProviders,
    createProvider,
    updateProvider,
    eliminarProvider
};