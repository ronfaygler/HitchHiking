const mongoose = require('mongoose');

const Schema = mongoose.Schema

// TODO : decide if the address should be a schema or subdocument (to be in this document)
// // subdocument:
// const addressSchema = new Schema({
//     city: { type: String, required: true },
//     street: { type: String },
//     number: { type: Number },
//     point: { type: [Number] }  // For geospatial coordinates if needed
// });

const rideSchema = new Schema({
    departure: {
        type: Schema.Types.ObjectId, 
        ref: 'Address',
        required: true
    },
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    passengers: {
        type: [Schema.Types.ObjectId],
        ref: 'Passenger'
    },
    startTime: {
        type: Date,  // Type set to Date for timestamp of end
        required: true
    },
    endTime: {
        type: Date  // Type set to Date for timestamp of end
    },
    date: {
        type: Date, 
        required: true
    },
    pickUpLocations: {
        type: [Schema.Types.ObjectId],
        ref: 'Address', // optional array of Address objects 
    },
    passengersNumber: {
        type: Number,
        required: true
    },
    petInRide: {
        type: String,  // dog, cat, dont have
        required: true,
    },
    allowPet: {
        type: Boolean,
        required: true
    },
    rideRepeat: {
        type: String, // no, every week, every day
        required: true
    },
    stops: {
        type: [Schema.Types.ObjectId],
        ref: 'Address' // optional array of Address objects 
    },
    price: {
        type: Number,
        required: true
    }

}, { timestamps: true })

// Indexing the point field for geospatial queries
// rideSchema.index({ 'destination.point': '2dsphere' });

module.exports = mongoose.model('Ride', rideSchema);

