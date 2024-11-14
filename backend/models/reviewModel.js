const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewer: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'reviewerType'  // Dynamic reference based on reviewerType field
    },
    reviewee: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'revieweeType'  // Dynamic reference based on revieweeType field
    },
    reviewerType: {
        type: String,
        enum: ['Driver', 'Passenger'],  // Specifies the possible models to reference
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Review', reviewSchema);
