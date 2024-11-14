const express = require('express');
const Review = require('../models/reviewModel'); // Assuming the review model file is named 'reviewModel.js'

const router = express.Router();

// GET all reviews
router.get('/', (req, res) => {
    res.json({ mssg: 'GET all reviews' });
});

// GET a single review by ID
router.get('/:id', (req, res) => {
    res.json({ mssg: 'GET a single review' });
});

// POST a new review
router.post('/', async (req, res) => {
    const { reviewer, reviewee, rating, content } = req.body;
    
    try {
        const review = await Review.create({
            reviewer,
            reviewee,
            rating,
            content
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE a review by ID
router.delete('/:id', (req, res) => {
    res.json({ mssg: 'DELETE a review' });
});

// UPDATE a review by ID
router.patch('/:id', (req, res) => {
    res.json({ mssg: 'UPDATE a review' });
});

module.exports = router;
