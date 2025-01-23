const Ride = require("../models/rideModel");
const mongoose = require("mongoose");


const createRide = async (req, res) => {
    const {
        departure,
        destination,
        driver,
        startTime,
        date,
        passengersNumber,
        petInRide,
        allowPet,
        rideRepeat,
        price,
    } = req.body;

    try {
        const newRide = new Ride({
            departure,
            destination,
            driver,
            startTime,
            date,
            passengersNumber,
            petInRide,
            allowPet,
            rideRepeat,
            price,
        });

        // Save the new ride to the database
        await newRide.save();

        res.status(201).json({
            message: 'Ride created successfully',
            ride: newRide,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating ride',
            error: error.message,
        });
    }
};


// TODO: Check!!!!!!!!!!!!

// Get a single ride by ID
const getSingleRide = async (req, res) => {
    const { id } = req.params;

    try {
        const ride = await Ride.findById(id)
            .populate('departure')
            .populate('destination')
            .populate('driver')
            .populate('passengers')
            .populate('pickUpLocations')
            .populate('stops');

        if (!ride) {
            return res.status(404).json({
                message: 'Ride not found',
            });
        }

        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching ride',
            error: error.message,
        });
    }
};

// Delete a ride by ID
const deleteRide = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRide = await Ride.findByIdAndDelete(id);

        if (!deletedRide) {
            return res.status(404).json({
                message: 'Ride not found',
            });
        }

        res.status(200).json({
            message: 'Ride deleted successfully',
            ride: deletedRide,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting ride',
            error: error.message,
        });
    }
};

// Update a ride by ID
const updateRide = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRide = await Ride.findByIdAndUpdate(id, updates, { new: true })
            .populate('departure')
            .populate('destination')
            .populate('driver')
            .populate('passengers')
            .populate('pickUpLocations')
            .populate('stops');

        if (!updatedRide) {
            return res.status(404).json({
                message: 'Ride not found',
            });
        }

        res.status(200).json({
            message: 'Ride updated successfully',
            ride: updatedRide,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating ride',
            error: error.message,
        });
    }
};

module.exports = {
    createRide,
    getSingleRide,
    deleteRide,
    updateRide,
};