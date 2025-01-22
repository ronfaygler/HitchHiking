const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


// get a single user
const getSingleUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ mssg: "The ID is invalid" });
    }
    try {
        const user = await User.findById(id);
        if (!user){
            return res.status(400).json({ mssg: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(500).json({ mssg: "An error occurred while fetching the user", error: err.message})
    }
};

// create a new user
const createUser = async (req, res) => {
    const { 
        firstName,
        lastName,
        birthDate,
        username,
        password,
        email,
        gender,
        profileImage,
        socialLink 
    } = req.body;
    const salt = await bcrypt.genSalt(); //for password encryption
    const user_exists = await User.findOne({ email });
    if (user_exists) {
        res.status(400).json({ mssg: "The email is already in use." });
        return;
    }

    const username_exists = await User.findOne({ username });
    if (username_exists) {
        res.status(400).json({ mssg: "The username is already exists." });
        return;
    }
    else {
        try {
                const user = await User.create({
                    firstName,
                    lastName,
                    birthDate,
                    username,
                    password: await bcrypt.hash(password, salt),
                    email,
                    gender,
                    profileImage,
                    socialLink
                });
                res.status(201).json({ message: 'User created successfully', user });
            }
        catch (error) {
                res.status(400).json({ error: error.message });
        }
    }   
};

// // sign in with email and password
// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }); //find user by email
//     if (user == null) {
//       // user was not found
//       return res.status(401).json({ mssg: "error finding user" });
//     }

//     if (await bcrypt.compare(password, user.password)) {
//       // check if the password matches
//       res
//         .status(200)
//         .json({ userName: user.userName, profilePic: user.profilePicURL });
//     } else {
//       return res.status(401).json({ mssg: "invalid password" });
//     }
//   } catch (err) {
//     res.status(400).json({ mssg: "error logging in" });
//   }
// };

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ mssg: "The id isn't valid" });
    }
    const user = await User.findById(id);
    if (!user){
        return res.status(404).json({ mssg: "User not found" })
    }
    await User.deleteOne( { _id: id } )
    res.status(200).json({ mssg: `${user.username} deleted successfully` });
}

module.exports = {
    createUser,
    getSingleUser,
    deleteUser,
    // signIn,
  };
  
