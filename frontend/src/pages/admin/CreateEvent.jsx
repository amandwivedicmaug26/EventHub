
import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function CreateEvent() {

  const navigate = useNavigate();

  // Store form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    category: "",
    price: 0,
    availableSeats: "",
    image: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Submit form
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    // Form validation
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.venue.trim() ||
      !formData.category.trim() ||
      formData.availableSeats === ""
    ) {

      setError("Please fill all required fields.");

      return;

    }

    if (
      Number(formData.price) < 0 ||
      Number(formData.availableSeats) <= 0 ||
      !Number.isInteger(Number(formData.availableSeats))
    ) {

      setError("Enter a valid price and number of available seats.");

      return;

    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      // Send event data to backend
      const response = await API.post(
        "/events",
        {
          ...formData,
          price: Number(formData.price),
          availableSeats: Number(formData.availableSeats)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(
        response.data.message || "Event created successfully!"
      );

      // Go to Manage Events page
      navigate("/admin/events");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Unable to create event. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <Box className="max-w-3xl">

      {/* Page Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        className="mb-2"
      >
        Create Event
      </Typography>

      <Typography
        color="text.secondary"
        className="mb-6"
      >
        Add a new event to EventHub
      </Typography>


      {/* Success Message */}
      {success && (

        <Alert severity="success" className="mb-4">
          {success}
        </Alert>

      )}


      {/* Error Message */}
      {error && (

        <Alert severity="error" className="mb-4">
          {error}
        </Alert>

      )}


      {/* Create Event Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        {/* Event Title */}
        <TextField
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />


        {/* Description */}
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
        />


        {/* Date */}
        <TextField
          label="Event Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          required
          slotProps={{
            inputLabel: {
              shrink: true
            }
          }}
        />


        {/* Venue */}
        <TextField
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          fullWidth
          required
        />


        {/* Category */}
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        />


        {/* Price */}
        <TextField
          label="Price (₹)"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          fullWidth
          slotProps={{
            htmlInput: {
              min: 0
            }
          }}
        />


        {/* Available Seats */}
        <TextField
          label="Available Seats"
          name="availableSeats"
          type="number"
          value={formData.availableSeats}
          onChange={handleChange}
          fullWidth
          required
          slotProps={{
            htmlInput: {
              min: 1,
              step: 1
            }
          }}
        />


        {/* Image URL */}
        <TextField
          label="Event Image URL (Optional)"
          name="image"
          value={formData.image}
          onChange={handleChange}
          fullWidth
        />


        {/* Buttons */}
        <Box className="flex gap-3 mt-2">

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Event"}
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/admin/events")}
          >
            Cancel
          </Button>

        </Box>

      </Box>

    </Box>

  );

}

export default CreateEvent;
