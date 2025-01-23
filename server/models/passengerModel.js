const mongoose = require('mongoose');
const Review = require('./reviewModel');

// Define the passenger schema
const passengerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    description: {
        type: String, // A general description about the passenger
        required: true
    },
    reviewIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review', // Reference to the Review model
    }],
    tripsCompleted: {
        type: Number, // Number of trips the passenger has completed
        default: 0
    },
    tripsOrdered: {
        type: Number, // Total number of trips the passenger has ordered
        default: 0
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null // Default to 0 if no reviews exist
    }
}, { timestamps: true });

// Method to calculate and set the average rating
passengerSchema.methods.calculateAndSetRating = async function() {
    const reviews = await Review.find({ reviewedId: this._id });
    if (reviews.length === 0) {
        this.rating = null;
    } else {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.rating = totalRating / reviews.length;
    }
};

// Mongoose pre-save hook to update the rating when a review is added or updated
passengerSchema.pre('save', async function(next) {
    await this.calculateAndSetRating();
    next();
});

// Create the passenger model
const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
