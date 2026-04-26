const fakeStoreController = require('../controllers/fakeStoreController');
const express = require('express');
const router = express.Router();

router.get('/fake/products', fakeStoreController.getProducts);
router.get('/fake/products/:id', fakeStoreController.getProduct);
router.post('/fake/products', fakeStoreController.createProduct);

module.exports = router;