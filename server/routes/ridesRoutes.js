const express = require('express');
const {
    createRide,
    getSingleRide,
    deleteRide,
    updateRide,
} = require('../controllers/rideController');

const router = express.Router();

// Routes
router.post('/', createRide);
router.get('/:id', getSingleRide);
router.delete('/:id', deleteRide);
router.put('/:id', updateRide);

module.exports = router;
