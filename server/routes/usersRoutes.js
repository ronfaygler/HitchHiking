const express = require("express");
const {
  getSingleUser,
  createUser,
  deleteUser,
//   signIn,
} = require("../controllers/userController");

const router = express.Router();

/**
 * Read Only Permission Routes
 */
// GET a single user
router.get("/:id", getSingleUser);

/**
 * Read and Write Permission Routes
 */
// POST a new user
router.post("/", createUser);

router.delete("/:id", deleteUser)

// // POST a user login request
// router.post("/login", signIn);


module.exports = router