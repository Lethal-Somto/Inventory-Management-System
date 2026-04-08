const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, 
        required: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please use a valid email address"
    ]},
    password: {type: String, required: true},
    role: {type: String, enum: ['admin', 'salesperson', 'storekeeper'], default: 'salesperson'},
    phone: {type: String, required: true},
},
{timestamps: true});

module.exports = mongoose.model('User',userSchema);
//if user is in small letter, what will happen?