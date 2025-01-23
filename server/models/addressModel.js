// addressSchema.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const addressSchema = new Schema({
    city: { type: String, required: true },
    street: { type: String },
    number: { type: Number }
    // TODO : after choosing location API:
    // point: {
    //   type: { type: String, enum: ['Point'], default: 'Point' },  // Specify 'Point' type for GeoJSON
    //   coordinates: {
    //     type: [Number],  // [longitude, latitude]
    //     required: false,
    //     validate: {
    //       validator: function (value) {
    //         return value.length === 2;  // Ensure it has exactly 2 elements
    //       },
    //       message: 'Point coordinates must contain exactly two numbers [longitude, latitude].'
    //     }
    //   }
    // }
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);

