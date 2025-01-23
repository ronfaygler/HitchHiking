const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    reviewerID: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'reviewerType'  // Dynamic reference based on reviewerType field
    },
    revieweeID: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'revieweeType'  // Dynamic reference based on revieweeType field
    },
    reviewerType: {
        type: String,
        enum: ['Driver', 'Passenger'],  // Specifies the possible models to reference
        required: true
    },
    revieweeType: {
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
        type: String
    }
}, { timestamps: true });


// Custom validation to ensure `revieweeType` is the opposite of `reviewerType`
reviewSchema.pre('save', function (next) {
    if (
        (this.reviewerType === 'Driver' && this.revieweeType !== 'Passenger') ||
        (this.reviewerType === 'Passenger' && this.revieweeType !== 'Driver')
    ) {
        return next(new Error('revieweeType must be the opposite of reviewerType.'));
    }
    next();
});

module.exports = mongoose.model('Review', reviewSchema);
