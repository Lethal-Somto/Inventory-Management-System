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
const upload = require('../middleware/cloudinary');

router.post('/products', protect, authorizeRoles('admin','salesperson'), createProductwithEmail ); 
router.get('/products',protect, authorizeRoles('salesperson'), getProducts);
router.get('/products/:id', protect, getProduct);
router.put('/products/:id', protect, updateProduct);
router.delete('/products/:id', protect, authorizeRoles('admin'), deleteProduct);
router.patch('/upload/:id', protect, upload.single('ImageUrl'), updateProductImage);

module.exports = router;

//I'm just testing pull