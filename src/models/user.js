const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    cedula: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        validate(value) {
            if(value.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }
        }
    },
});

module.exports = mongoose.model('User', userSchema);