const express = require('express');

const {
    createReview,
    getAllDriverReviews,
    getAllPassengerReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");

const router = express.Router();

// Create a review
router.post("/", createReview)

// Get all reviews for a driver
router.get("/driver/:driverID", getAllDriverReviews)

// Get all reviews for a passenger
router.get('/passenger/:passengerID', getAllPassengerReviews);

// Get a single review by ID
router.get('/:id', getSingleReview);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;
