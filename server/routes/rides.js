const express = require('express')
const Ride = require('../models/rideModel')

const router = express.Router()

// GET all rides
router.get('/', (req, res) => {
    res.json({mssg: 'GET all rides'})
})

// GET all rides
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single ride'})
})

// POST a new ride
router.post('/', async (req, res) => {
    const {
        departure,
        destination,
        driver,
        passengers,
        startTime,
        endTime,
        date,
        pickUpLocations,
        passengersNumber,
        petInRide,
        allowPet,
        rideRepeat,
        stops,
        price
    } = req.body
    try{
        const ride = await Ride.create({
            departure,
            destination,
            driver,
            passengers,
            startTime,
            endTime,
            date,
            pickUpLocations,
            passengersNumber,
            petInRide,
            allowPet,
            rideRepeat,
            stops,
            price
        })
        res.status(200).json(ride)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// DELETE a ride
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a ride'})
})

// UPDATE a ride
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a ride'})
})

module.exports = router