const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controllers');


router.get('/', providerController.getAllproviders);
// router.get('/:id', userController.obtenerUsuario);
// router.post('/', userController.crearUsuario);
// router.put('/:id', userController.actualizarUsuario);
// router.delete('/:id', userController.eliminarUsuario);

module.exports = router;