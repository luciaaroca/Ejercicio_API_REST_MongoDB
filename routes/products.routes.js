const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controllers');


router.get('/', productController.getAllproducts);
//router.post("/",productController.postProduct);
router.put('/:id',productController.putProduct);
// router.delete('/:id', providerController.deleteProvider);

module.exports = router;