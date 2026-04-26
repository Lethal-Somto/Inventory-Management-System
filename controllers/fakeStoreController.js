const apiAdapter = require('../config/fakeStoreAdapter');

//get all products
exports.getProducts = async (req, res) => {
    //save to database
    await apiAdapter.getProducts(req, res);
};

//get single product
exports.getProduct = async (req, res)  =>{
    await apiAdapter.getProduct(req, res);
};

//create product
exports.createProduct = async (req, res) =>{
     const { title, price} = req.body;

    if (!title || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    await apiAdapter.createProduct(req, res);
};