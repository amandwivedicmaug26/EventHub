
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import API from "../../services/api";

function EditEvent() {

  const navigate = useNavigate();

  // Get event ID from URL
  const { id } = useParams();

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

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");


  // Fetch existing event details
  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const token = localStorage.getItem("token");

        const response = await API.get(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const event =
          response.data.event ||
          response.data.data?.event ||
          response.data.data;

        // Fill form with existing event data
        setFormData({
          title: event.title || "",
          description: event.description || "",
          date: event.date
            ? new Date(event.date).toISOString().slice(0, 10)
            : "",
          venue: event.venue || "",
          category: event.category || "",
          price: event.price ?? 0,
          availableSeats: event.availableSeats ?? "",
          image: event.image || ""
        });

      } catch (err) {

        console.log(err);

        setError(
          err.response?.data?.message ||
          "Unable to fetch event details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchEvent();

  }, [id]);


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Update event
  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

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

      setError("Enter a valid price and available seats.");

      return;

    }

    try {

      setUpdating(true);

      const token = localStorage.getItem("token");

      // Send updated data to backend
      const response = await API.put(
        `/events/${id}`,
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
        response.data.message || "Event updated successfully!"
      );

      // Return to Manage Events
      navigate("/admin/events");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Unable to update event."
      );

    } finally {

      setUpdating(false);

    }

  };


  // Loading
  if (loading) {

    return (

      <Box className="flex justify-center p-10">

        <CircularProgress />

      </Box>

    );

  }


  return (

    <Box className="max-w-3xl">

      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        className="mb-2"
      >
        Edit Event
      </Typography>

      <Typography
        color="text.secondary"
        className="mb-6"
      >
        Update existing event details
      </Typography>


      {/* Error Message */}
      {error && (

        <Alert severity="error" className="mb-4">
          {error}
        </Alert>

      )}


      {/* Edit Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <TextField
          label="Event Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />

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

        <TextField
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        />

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
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Event"}
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

export default EditEvent;
