const Registration = require("../models/Registration");
const Event = require("../models/Event");
const mongoose = require("mongoose");


// 1. REGISTER FOR EVENT
const registerForEvent = async (req, res) => {
    let seatReserved = false;
    let eventId;

    try {
        // Get logged-in user ID from authentication middleware
        const userId = req.user._id;

        eventId = req.params.eventId;

        if (!mongoose.isValidObjectId(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID"
            });
        }

        // Check whether event exists
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Check existing registration
        const existingRegistration = await Registration.findOne({
            user: userId,
            event: eventId
        });

        if (existingRegistration &&
            existingRegistration.status === "confirmed") {

            return res.status(400).json({
                message: "You are already registered for this event"
            });
        }

        // Reserve one seat only if seats are available
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                availableSeats: { $gt: 0 }
            },
            {
                $inc: { availableSeats: -1 }
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(400).json({
                message: "Sorry, no seats available"
            });
        }

        seatReserved = true;

        let registration;

        if (existingRegistration) {

            // Reactivate cancelled registration
            existingRegistration.status = "confirmed";
            existingRegistration.registrationDate = new Date();

            registration = await existingRegistration.save();

        } else {

            // Create new registration
            registration = new Registration({
                user: userId,
                event: eventId
            });

            await registration.save();
        }

        seatReserved = false;

        res.status(201).json({
            message: "Registration successful",
            registration
        });

    } catch (error) {

        // Return seat if registration creation fails
        if (seatReserved) {
            await Event.findByIdAndUpdate(
                eventId,
                { $inc: { availableSeats: 1 } }
            );
        }

        if (error.code === 11000) {
            return res.status(409).json({
                message: "You are already registered for this event"
            });
        }

        res.status(500).json({
            message: "Error registering for event",
            error: error.message
        });
    }
};


// 2. GET ALL REGISTRATIONS (ADMIN)
const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate("user", "name email")
            .populate("event", "title date venue");

        res.status(200).json({
            message: "Registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching registrations",
            error: error.message
        });
    }
};


// 3. GET REGISTRATION BY ID
const getRegistrationById = async (req, res) => {
    try {
        const registrationId = req.params.id;

        if (!mongoose.isValidObjectId(registrationId)) {
            return res.status(400).json({
                message: "Invalid registration ID"
            });
        }

        const registration = await Registration.findById(registrationId)
            .populate("user", "name email")
            .populate("event", "title date venue");

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        // User can view only their own registration
        if (req.user.role !== "admin" &&
            registration.user._id.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You are not authorized to view this registration"
            });
        }

        res.status(200).json({
            message: "Registration fetched successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching registration",
            error: error.message
        });
    }
};


// 4. CANCEL REGISTRATION
const cancelRegistration = async (req, res) => {
    try {
        const registrationId = req.params.id;

        if (!mongoose.isValidObjectId(registrationId)) {
            return res.status(400).json({
                message: "Invalid registration ID"
            });
        }

        // Find registration
        const registration = await Registration.findById(registrationId);

        if (!registration) {
            return res.status(404).json({
                message: "Registration not found"
            });
        }

        // Only owner or admin can cancel
        if (req.user.role !== "admin" &&
            registration.user.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You cannot cancel another user's registration"
            });
        }

        // Check registration status
        if (registration.status === "cancelled") {
            return res.status(400).json({
                message: "Registration is already cancelled"
            });
        }

        // Update registration status
        registration.status = "cancelled";
        await registration.save();

        // Increase available seats
        await Event.findByIdAndUpdate(
            registration.event,
            { $inc: { availableSeats: 1 } }
        );

        res.status(200).json({
            message: "Registration cancelled successfully",
            registration
        });

    } catch (error) {
        res.status(500).json({
            message: "Error cancelling registration",
            error: error.message
        });
    }
};


// 5. GET LOGGED-IN USER REGISTRATIONS
const getUserRegistrations = async (req, res) => {
    try {
        const userId = req.user._id;

        const registrations = await Registration.find({
            user: userId
        }).populate("event", "title description date venue category price image");

        res.status(200).json({
            message: "Your registrations fetched successfully",
            registrations
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching your registrations",
            error: error.message
        });
    }
};


// EXPORT FUNCTIONS
module.exports = {
    registerForEvent,
    getAllRegistrations,
    getRegistrationById,
    cancelRegistration,
    getUserRegistrations
}