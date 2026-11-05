const express = require("express");

const router = express.Router();

// Register for event
router.post("/", (req, res) => {
    res.send("Event registration successful");
});

// Get all registrations
router.get("/", (req, res) => {
    res.send("Get all registrations");
});

// Get participants of an event
router.get("/:eventId", (req, res) => {
    res.send("Get event participants");
});

// DELETE - Cancel registration
router.delete("/", (req, res) => {
res.send("Registration cancelled");
});

module.exports = router;