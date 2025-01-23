const Driver = require("../models/driverModel");
const Passenger = require("../models/passengerModel");
const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

const createReview = async (req,res) => {
    const {
        reviewerID,
        revieweeID,
        reviewerType,
        revieweeType,
        rating,
        content
    } = req.body

    let driver, passenger;
    try {
        if (reviewerType == "Driver"){
            driver = await Driver.findById(reviewerID)
            passenger = await Passenger.findById(revieweeID)
        }
        else {
            driver = await Driver.findById(revieweeID)
            passenger = await Passenger.findById(reviewerID)
        }
        if (!driver || !passenger){
            return res.status(404).json({ mssg: "The driver or passenger was not found."})
        }
     } catch (error){
        return res.status(500).json({ error: error.message })
    }

    if (rating < 1 || rating > 5){
        return res.status(400).json({ mssg: "The rating suppose to be between 1 to 5. "})
    }
    try{
        const review = await Review.create({ reviewerID, revieweeID, reviewerType, revieweeType, rating, content })
        return res.status(201).json({ mssg: "The review was added successfully.", review})
    } catch (err){
        return res.status(400).json({ error: err.message })
    }
}

// Get all reviews for a specific driver
const getAllDriverReviews = async (req, res) => {
    const { driverID } = req.params;
    const driver = await Driver.findById(driverID)
    if (!driver){
        return res.status(404).json({ mssg: "The driver was not found."})
    }
    try {
        const reviews = await Review.find({
            revieweeID: driverID,
            revieweeType: 'Driver',
        }).populate('reviewerID'); // Populate reviewer info
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get all reviews for a specific passenger
const getAllPassengerReviews = async (req, res) => {
    const { passengerID } = req.params;
    const passenger = await Passenger.findById(passengerID)
    if (!passenger){
        return res.status(404).json({ mssg: "The passenger not found."})
    }
    try {
        const reviews = await Review.find({
            revieweeID: passengerID,
            revieweeType: 'Passenger',
        }).populate('reviewerID'); // Populate reviewer info if needed
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single review by its ID
const getSingleReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id)
            .populate('reviewerID') // Populate reviewer details
            .populate('revieweeID'); // Populate reviewee details
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an existing review
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, content } = req.body;

    try {
        const review = await Review.findByIdAndUpdate(
            id,
            { rating, content },
            { new: true, runValidators: true }
        );
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an existing review
const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found.' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    createReview,
    getAllDriverReviews,
    getAllPassengerReviews,
    getSingleReview,
    updateReview,
    deleteReview,
};