
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    availableSeats: {
        type: Number,
        required: true
    },

    image: {
        type: String
    }

}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
