
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function ManageEvents() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get all events
  const fetchEvents = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/events", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEvents(response.data.events || []);

    } catch (err) {

      console.log(err);

      setError("Unable to fetch events.");

    } finally {

      setLoading(false);

    }

  };

  // Load events when page opens
  useEffect(() => {

    fetchEvents();

  }, []);


  // Delete event
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove deleted event from screen
      setEvents(events.filter((event) => event._id !== id));

      alert("Event deleted successfully!");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message || "Unable to delete event."
      );

    }

  };


  // Format date
  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-IN");

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

    <Box>

      {/* Heading */}
      <Box className="flex flex-wrap justify-between items-center gap-3 mb-6">

        <Box>

          <Typography variant="h4" fontWeight="bold">
            Manage Events
          </Typography>

          <Typography color="text.secondary">
            View, edit and delete events
          </Typography>

        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/events/create")}
        >
          + Create Event
        </Button>

      </Box>


      {/* Error Message */}
      {error && (

        <Alert severity="error" className="mb-4">
          {error}
        </Alert>

      )}


      {/* Events Table */}
      <TableContainer component={Paper} elevation={1}>

        <Table>

          <TableHead>

            <TableRow sx={{ backgroundColor: "#F5F5F5" }}>

              <TableCell><b>Event Name</b></TableCell>

              <TableCell><b>Category</b></TableCell>

              <TableCell><b>Date</b></TableCell>

              <TableCell><b>Venue</b></TableCell>

              <TableCell><b>Price</b></TableCell>

              <TableCell><b>Seats</b></TableCell>

              <TableCell><b>Actions</b></TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {events.length > 0 ? (

              events.map((event) => (

                <TableRow key={event._id}>

                  <TableCell>
                    {event.title}
                  </TableCell>

                  <TableCell>
                    {event.category}
                  </TableCell>

                  <TableCell>
                    {formatDate(event.date)}
                  </TableCell>

                  <TableCell>
                    {event.venue}
                  </TableCell>

                  <TableCell>
                    ₹{event.price}
                  </TableCell>

                  <TableCell>
                    {event.availableSeats}
                  </TableCell>

                  <TableCell>

                    <Box className="flex gap-2">

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          navigate(`/admin/events/edit/${event._id}`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(event._id)}
                      >
                        Delete
                      </Button>

                    </Box>

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell colSpan={7} align="center">

                  No events available.

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

}

export default ManageEvents;
