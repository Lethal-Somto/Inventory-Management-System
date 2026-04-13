const express = require('express');
const router = express.Router();
const{
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    updateProductImage,
    createProductwithEmail,
} = require('../controllers/productController')

//bring in middleware
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

router.post('/products',createProductwithEmail );
router.get('/products',protect,authorizeRoles('salesperson'), getProducts);
router.get('/products/:id', protect, getProduct);
router.put('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);
router.patch('/upload/:id', updateProductImage);

module.exports = router;

//I'm just testing pull