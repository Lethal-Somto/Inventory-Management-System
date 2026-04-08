//const { findOne } = require('../models/productModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
   try{
        const {name, email, role, phone, password} = req.body;
        //check existing email
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: 'User with this Email already exists.'});
        }

        //check existing phone number
         const existingPhone = await User.findOne({phone});
        if (existingPhone){
            return res.status(400).json({message: 'User with same Phone number already exists.'});
        }

        //hash password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            password: passwordHash,
            email,
            role,
            phone
        });
        res.status(201).json({message: "User created successfully.", data: user});
   }catch(err){
         res.status(500).json(err.message)
   }
};

//LOGIN
exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'Invalid Credentials'});
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
             return res.status(400).json({message: 'Invalid Credentials'});
        }

        //Generate token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        })
    }catch(err){
        res.status(500).json(err.message);
    }
};
