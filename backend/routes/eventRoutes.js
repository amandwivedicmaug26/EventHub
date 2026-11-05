const express = require("express");
const router = express.Router();

// Import event controller functions
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require("../controllers/eventController.js");

// Import authentication middleware
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET - Get all events (Public)
router.get("/", getAllEvents);

// GET - Get single event by ID (Public)
router.get("/:id", getEventById);

// POST - Create event (Admin only)
router.post("/", authMiddleware, adminMiddleware, createEvent);

// PUT - Update event (Admin only)
router.put("/:id", authMiddleware, adminMiddleware, updateEvent);

// DELETE - Delete event (Admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent);

module.exports = router;