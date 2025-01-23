const Driver = require("../models/driverModel");
const User = require('../models/userModel'); // Assuming you also have a User model
const mongoose = require("mongoose");

// Create a new driver
const createDriver = async (req, res) => {
    const { 
        userId,
        smoking,
        description,
        carType,
        petsAllowed
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ mssg: "The user ID is invalid" });
    }

    try {
        
        // Check if the userId exists and is valid
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ mssg: "User not found" });
        }
        const driver_exist = Driver.findOne({ userId })
        if (driver_exist){
            return res.status(400).json({ mssg: "driver already exists" })
        }
        // Create the driver
        const newDriver = new Driver({
            userId,
            smoking,
            description,
            carType,
            petsAllowed
        });

        // Save the driver to the database
        await newDriver.save();
        res.status(201).json({ message: 'Driver created successfully', driver: newDriver });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mssg: 'Error creating driver', error: error.message });
    }
};

const getSingleDriver = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ mssg: "The ID is invalid" });
    }
    try{
        const driver = await Driver.findById(id)
        if (!driver){
            return res.status(404).json({ mssg: "The driver not found" })
        }
        return res.status(200).json({ driver })
    } catch (err) {
        return res.status(500).json({ mssg: "An error occurred while fetching the driver", error: err.message })
    }

}

module.exports = {
    createDriver,
    getSingleDriver
};

