const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinaryConfig');

const User = require('../models/userModel');
const sendEmail = require('../middleware/emailSender');

const createProductwithEmail = async(req, res) => {
    try{
        const {name, price, quantity} = req.body;

        const ImageUrl = req.file ? req.file.path : null; // get cloudinary URL

        const product = new Product({name, price, quantity, ImageUrl});
        await product.save();

        const admins = await User.find({role: "admin"});
        const adminEmails = admins.map(a => a.email);

        const subject = "New Product Created";
        const message = `
        <h3>New product alert</h3>
        <p> A new product has been created:</p>
        <ul>
        <li><strong>Name:</strong>${product.name}</li>
        <li><strong>Price:</strong>${product.price}</li>
        </ul>
        `;
        if (adminEmails.length > 0) {
            await sendEmail(adminEmails, subject, message);
        }
        return res.status(201).json({
            message: "Product created and Admin notified.",
            product
        });
    }catch(err){
        res.status(500).json({error: err.message});
    }
}
const updateProductImage = async (req, res) => {
      console.log('req.file:', req.file); // 👈 add this
    console.log('req.params:', req.params); // 👈 and this
    try{
        const productId = req.params.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }

        if (product.ImageUrl) {
            const publicId = product.ImageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`products/${publicId}`);
        }

        product.ImageUrl = req.file.path;

        await product.save();

        res.status(200).json({
            message: "Image successfully updated",
            product
        });
    }catch(err){
         console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
        res.status(500).json({error: err.message});
    }
};

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
    deleteProduct,
    updateProductImage,
    createProductwithEmail
};