const express = require("express");

const router = express.Router();

// GET all events
router.get("/", (req, res) => {
    res.send("Get all events");
});

// GET single event
router.get("/:id", (req, res) => {
    res.send("Get single event");
});

// POST event
router.post("/", (req, res) => {
    res.send("Add new event");
});

// UPDATE event
router.put("/:id", (req, res) => {
    res.send("Update event");
});

// DELETE event
router.delete("/:id", (req, res) => {
    res.send("Delete event");
});

module.exports = router;