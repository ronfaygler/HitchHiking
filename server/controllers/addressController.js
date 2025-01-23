const Address = require('../models/addressModel');

// Create a new address
const createAddress = async (req, res) => {
    try {
        const { city, street, number } = req.body;

        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }

        const address = await Address.create({ city, street, number });
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error creating address', error: error.message });
    }
};

// Get a single address by ID
const getSingleAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findById(id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching address', error: error.message });
    }
};

// Update an address by ID
const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const { city, street, number } = req.body;

        const address = await Address.findByIdAndUpdate(
            id,
            { city, street, number },
            { new: true, runValidators: true } // Return the updated document and validate input
        );

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Error updating address', error: error.message });
    }
};

module.exports = {
    createAddress,
    getSingleAddress,
    updateAddress
};
