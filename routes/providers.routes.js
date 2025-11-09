const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controllers');


router.get('/', providerController.getAllproviders);
router.post('/', providerController.postProvider);
router.put('/:companyName',providerController.putProvider);
router.delete('/:id', providerController.deleteProvider);

module.exports = router;