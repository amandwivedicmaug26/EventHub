
const Event = require("../models/Event");

// 1. CREATE EVENT
const createEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            venue,
            category,
            price,
            availableSeats,
            image
        } = req.body;

        // Check required fields
        if (!title || !description || !date ||
            !venue || !category || availableSeats == null) {

            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check date
        if (isNaN(Date.parse(date))) {
            return res.status(400).json({
                message: "Invalid event date"
            });
        }

        // Check numeric values
        if (!Number.isFinite(Number(price ?? 0)) ||
            Number(price ?? 0) < 0 ||
            !Number.isInteger(Number(availableSeats)) ||
            Number(availableSeats) < 0) {

            return res.status(400).json({
                message: "Invalid price or available seats"
            });
        }

        // Create new event
        const newEvent = new Event({
            title,
            description,
            date,
            venue,
            category,
            price: price ?? 0,
            availableSeats,
            image
        });

        // Save event in database
        const savedEvent = await newEvent.save();

        res.status(201).json({
            message: "Event created successfully",
            event: savedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating event",
            error: error.message
        });
    }
};


// 2. GET ALL EVENTS
const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });

        res.status(200).json({
            message: "Events fetched successfully",
            events
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching events",
            error: error.message
        });
    }
};


// 3. GET SINGLE EVENT
const getEventById = async (req, res) => {
    try {
        const eventId = req.params.id;

        // Check valid MongoDB ID
        if (!require("mongoose").isValidObjectId(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event fetched successfully",
            event
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching event",
            error: error.message
        });
    }
};


// 4. UPDATE EVENT
const updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        if (!require("mongoose").isValidObjectId(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID"
            });
        }

        // Only allow these fields to be updated
        const allowedFields = [
            "title",
            "description",
            "date",
            "venue",
            "category",
            "price",
            "image"
        ];

        const updateData = {};

        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        if (updateData.date !== undefined &&
            isNaN(Date.parse(updateData.date))) {
            return res.status(400).json({
                message: "Invalid event date"
            });
        }

        if (updateData.price !== undefined &&
            (!Number.isFinite(Number(updateData.price)) ||
             Number(updateData.price) < 0)) {
            return res.status(400).json({
                message: "Invalid event price"
            });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating event",
            error: error.message
        });
    }
};


// 5. DELETE EVENT
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        if (!require("mongoose").isValidObjectId(eventId)) {
            return res.status(400).json({
                message: "Invalid event ID"
            });
        }

        const deletedEvent = await Event.findByIdAndDelete(eventId);

        if (!deletedEvent) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        // Delete registrations related to this event
        const Registration = require("../models/Registration");

        await Registration.deleteMany({ event: eventId });

        res.status(200).json({
            message: "Event and related registrations deleted successfully",
            event: deletedEvent
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting event",
            error: error.message
        });
    }
};


// EXPORT FUNCTIONS
module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
