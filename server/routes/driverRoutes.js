const express = require("express");
const {
  getSingleDriver,
  createDriver,
  // deleteDriver,
} = require("../controllers/driverController");

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET a single driver
router.get("/:id", getSingleDriver);

/**
 * Read and Write Permission Routes
 */
// POST a new driver
router.post("/", createDriver);

// router.delete("/:id", deleteDriver)


module.exports = router