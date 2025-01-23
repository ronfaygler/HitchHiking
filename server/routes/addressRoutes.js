const express = require('express');
const {
    createAddress,
    getSingleAddress,
    updateAddress
} = require('../controllers/addressController');

const router = express.Router();

// POST: Create a new address
router.post('/', createAddress);

// GET: Get a single address by ID
router.get('/:id', getSingleAddress);

// PUT: Update an address by ID
router.put('/:id', updateAddress);

module.exports = router;
