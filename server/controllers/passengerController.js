const mongoose = require("mongoose");
const Passenger = require("../models/passengerModel");
const User = require('../models/userModel'); // Import User model to verify user existence
// const { validationResult } = require('express-validator'); // Optionally for validation


// Create a new passenger
const createPassenger = async (req, res) => {
    const { userId, description } = req.body;

    // // Optional: Validate the incoming data
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ mssg: "The user ID is invalid" });
    }

    try {
        // Check if the user exists (userId should reference a valid User)
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ mssg: "User not found" });
        }

        // Create the passenger
        const newPassenger = new Passenger({
            userId,
            description
        });

        // Save the passenger to the database
        await newPassenger.save();

        // Send success response
        res.status(201).json({ message: 'Passenger created successfully', passenger: newPassenger });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mssg: "Error creating passenger", error: error.message });
    }
};

// get a single passenger
const getSinglePassenger = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ mssg: "The ID is invalid" });
    }
    try {
        const passenger = await Passenger.findById(id);
        if (!passenger){
            return res.status(400).json({ mssg: "Passenger not found" });
        }
        return res.status(200).json({ passenger });
    } catch (err) {
        return res.status(500).json({ mssg: "An error occurred while fetching the Passenger", error: err.message})
    }
};





module.exports = {
    createPassenger,
    getSinglePassenger,
    // deleteUser,
  };
  