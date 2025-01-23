const mongoose = require('mongoose');
const Review = require('./reviewModel');

// Define the driver schema
const driverSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming the user model is already defined and referenced here
        required: true
    },
    smoking: {
        type: Boolean, // True if the driver smokes, false otherwise
        required: true
    },
    description: {
        type: String, // A general description of the driver's personality
        required: true
    },
    carType: {
        type: String,
        required: false, // For example: 'Sedan', 'SUV', etc.
    },
    petsAllowed: {
        type: Boolean, // True if the driver allows pets, false otherwise
        required: false
    },
    reviewIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review', // a review model that the driver’s reviews will be linked to
    }],
    tripsCompleted: {
        type: Number, // Number of trips completed
        default: 0
    },
    totalTrips: {
        type: Number,
        default: 0,
    },
    experience: {
        type: Number, // Calculated experience, e.g., years of driving or based on completed trips
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null // Default to null if no reviews exist
    },
}, { timestamps: true });

// Method to calculate and set the average rating
driverSchema.methods.calculateAndSetRating = async function() {
    const reviews = await Review.find({ reviewedId: this._id, type: 'driver' });
    if (reviews.length === 0) {
        this.rating = null;
    } else {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = totalRating / reviews.length;
    }
};

// Mongoose pre-save hook to update the rating when a review is added or updated
driverSchema.pre('save', async function(next) {
    await this.calculateAndSetRating();
    next();
});

// Create the driver model
const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
