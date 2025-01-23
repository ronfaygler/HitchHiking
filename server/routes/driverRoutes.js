const express = require("express");
const {
  getSingleDriver,
  createDriver,
  // deleteDriver,
//   signIn,
} = require("../controllers/driverController");

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET a single user
router.get("/:id", getSingleDriver);

/**
 * Read and Write Permission Routes
 */
// POST a new user
router.post("/", createDriver);

// router.delete("/:id", deleteDriver)

// // POST a user login request
// router.post("/login", signIn);


module.exports = router