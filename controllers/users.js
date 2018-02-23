const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Register
router.post('/register', (req, res, next) => {
   let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false,
                 message: `Failed to register `});
        }else {
            res.json(
                {
                success: true, 
                message: `User Registration was Successful`,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUsername(username, (err, user) => {
        // if(err.statusText == 'Unknown Error') {
        //     res.json({success: false, message: 'Server error'});
        // }
        if(!user) {
            res.json({success: false, message: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {
                res.json({success: false, message: `Server Error: Try Again Later`});
            };
            if(isMatch) {
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800  // 1 week
                });

                res.json({
                    success: true,
                    message: 'Login successful',
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
            }
            if(!isMatch)  {
                res.json({success: false, message: 'Password not match '});
            }

        });
    });
    
});

// All Users
router.get('/', (req, res, next) => {
    User.getUsers((err, users) => {
        if(err) {
            res.json({success: false, message: `Failed to load users Error: `});
        }else {
            res.json({success: true, user: users.map(user => {
               return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    isAdmin: user.isAdmin
               };
            })});
            // res.write(JSON.stringify({success: true, data: users}, null, 2));
            res.end();
        }

    })
});

// Update User
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    let password = req.body.password;
    let userUpdate;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if(err) {
                res.json({success: false, message: 'Error: Unable to update user'});
            }
            password = hash;
            userUpdate = {
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: password,
                isAdmin: req.body.isAdmin
            };

            User.updateUserById(id, {$set: userUpdate}, {new: true}, (err, user) => {
                if(err) {
                    res.json({success: false, message: 'Error: Unable to update user'});
                }else {
                    res.json({
                        success: true,
                        message: 'User was updated successfully',
                        user: {
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                username: user.username,
                                isAdmin: user.isAdmin
                            }
                    });
                 }
            });
        });
    });
});

// Delete User
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    User.deleteUserById(id, (err, user) => {
        if(err) {
            res.json({success: false, message: 'Error: Unable to delete user'});
        }else {
            res.json({success: true, message: 'User was deleted successfully'});
        }
    });

});



// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user})
});

module.exports = router;