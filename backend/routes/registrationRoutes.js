const express = require("express");
const router = express.Router();

// Import registration controller functions
const {
    registerForEvent,
    getAllRegistrations,
    getRegistrationById,
    cancelRegistration,
    getUserRegistrations
} = require("../controllers/registrationController.js");

// Import middleware
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// POST - Register for an event (Logged-in user)
router.post("/:eventId", authMiddleware, registerForEvent);

// GET - Get all registrations (Admin only)
router.get("/", authMiddleware, adminMiddleware, getAllRegistrations);

// GET - Get logged-in user's registrations
router.get("/my-registrations", authMiddleware, getUserRegistrations);

// GET - Get a particular registration by ID
router.get("/:id", authMiddleware, getRegistrationById);

// DELETE - Cancel registration (Owner or Admin)
router.delete("/:id", authMiddleware, cancelRegistration);

module.exports = router;