const express = require('express');
const router = express.Router();
const{
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')

//bring in middleware
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/roleMiddleware');

router.post('/products',protect, authorizeRoles('admin','salesperson'),createProduct );
router.get('/products',protect,authorizeRoles('salesperson'), getProducts);
router.get('/products/:id', protect, getProduct);
router.put('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, deleteProduct);

module.exports = router;