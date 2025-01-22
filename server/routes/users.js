const express = require('express');
const User = require('../models/userModel'); // Assuming this file is named 'userModel.js'

const router = express.Router();

// GET all rides
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

// GET all rides
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single user'})
})

// POST a new user (sign-up)
router.post('/', async (req, res) => {
    const {
        firstName,
        lastName,
        birthDate,
        username,
        password,
        email,
        gender,
        profileImage,
        socialLink
    } = req.body;
    
    try {
        const user = await User.create({
            firstName,
            lastName,
            birthDate,
            username,
            password,  // Ensure password is hashed before saving in production
            email,
            gender,
            profileImage,
            socialLink
        });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a ride
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a user'})
})

// UPDATE a ride
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a user'})
})

module.exports = router