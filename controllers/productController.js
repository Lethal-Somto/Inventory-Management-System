const Product = require('../models/productModel');

const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
};

const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
}

const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({error: "Product not found"});
    res.json(product);
};

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}
    )
    if (!product) return res.status(404).json({error: "Product not found"});
    res.json(product);
};

const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({error: "Product not found"});
    res.json({message: "Product deleted successfully.", data: product})
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
};