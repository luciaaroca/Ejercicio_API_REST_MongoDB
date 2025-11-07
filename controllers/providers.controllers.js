const providersService = require('../services/providers.service');

//GET -> todos los providers
//http://localhost:3000/api/providers
const getAllproviders = async (req, res) => {
    try {
        const providers = await providersService.obtenerTodosLosProviders();
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
getAllproviders
};