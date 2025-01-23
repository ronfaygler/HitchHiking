const express = require("express");
const {
  getSinglePassenger,
  createPassenger,
//   deletePassenger,
//   signIn,
} = require("../controllers/passengerController");

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET a single user
router.get("/:id", getSinglePassenger);

/**
 * Read and Write Permission Routes
 */
// POST a new user
router.post("/", createPassenger);

// router.delete("/:id", deletePassenger)

// // POST a user login request
// router.post("/login", signIn);


module.exports = router