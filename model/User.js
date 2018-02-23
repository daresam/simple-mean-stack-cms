const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const Schema = mongoose.Schema;
const UserSchema = Schema({
    
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        default: 0
    }
    
}, {timestamps: true});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = (id, callback) => {
    let query = {_id: id};
    User.findOne(query, callback);
    // User.findById(id, callback);
}

module.exports.getUsername = (username, callback) => {
    const query = { username: username};
    User.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                return done(err, false);
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if(err) done(err, false);
        callback(null, isMatch);
    });
}

module.exports.getUsers = (callback) => {
    User.find(callback);
}

module.exports.updateUserById = (id, user, options, callback) => {
    let query = {_id: id};
   
    User.findByIdAndUpdate(query, user, options, callback);
}

module.exports.deleteUserById = (id, callback) => {
    let query = {_id: id};
    User.remove(query, callback);
}