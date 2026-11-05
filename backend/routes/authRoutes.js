const express = require("express");

const router = express.Router();

// User Registration
router.post("/register", (req, res) => {
    res.send("User registered successfully");
});

// User Login
router.post("/login", (req, res) => {
    res.send("User login successful");
});

// User Profile
router.get("/profile", (req, res) => {
    res.send("User profile");
});

module.exports = router;