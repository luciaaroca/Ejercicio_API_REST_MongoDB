const Provider = require("../models/provider.model");

const obtenerTodosLosProviders = async () => {
    return await Provider.find();
};


module.exports = {
    obtenerTodosLosProviders
};