
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

function AdminDashboard() {

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch events and registrations
  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const token = localStorage.getItem("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Call both backend APIs
        const [eventResponse, registrationResponse] =
          await Promise.all([
            API.get("/events", config),
            API.get("/registrations", config)
          ]);

        // Get events array
        const eventData =
          eventResponse.data.events ||
          eventResponse.data.data?.events ||
          eventResponse.data.data ||
          eventResponse.data;

        // Get registrations array
        const registrationData =
          registrationResponse.data.registrations ||
          registrationResponse.data.data?.registrations ||
          registrationResponse.data.data ||
          registrationResponse.data;

        setEvents(Array.isArray(eventData) ? eventData : []);

        setRegistrations(
          Array.isArray(registrationData) ? registrationData : []
        );

      } catch (err) {

        console.log("Dashboard Error:", err);

        setError(
          "Unable to load dashboard data. Please check backend connection."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchDashboardData();

  }, []);


  // Get current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Count upcoming events
  const upcomingEvents = events.filter((event) => {

    const eventDate = new Date(event.date || event.eventDate);

    return !isNaN(eventDate) && eventDate >= today;

  });

  // Count past events
  const pastEvents = events.filter((event) => {

    const eventDate = new Date(event.date || event.eventDate);

    return !isNaN(eventDate) && eventDate < today;

  });


  // Dashboard statistics
  const statistics = [
    {
      title: "Total Events",
      value: events.length
    },
    {
      title: "Upcoming Events",
      value: upcomingEvents.length
    },
    {
      title: "Total Registrations",
      value: registrations.length
    },
    {
      title: "Past Events",
      value: pastEvents.length
    }
  ];


  // Get latest events
  const recentEvents = [...events]
    .sort((a, b) => {
      return new Date(b.createdAt || b.date || b.eventDate || 0) -
             new Date(a.createdAt || a.date || a.eventDate || 0);
    })
    .slice(0, 5);


  // Format event date
  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    const formattedDate = new Date(date);

    if (isNaN(formattedDate)) {
      return "Not available";
    }

    return formattedDate.toLocaleDateString("en-IN");

  };


  // Loading screen
  if (loading) {

    return (

      <Box className="flex justify-center items-center min-h-64">

        <CircularProgress />

      </Box>

    );

  }


  // Error message
  if (error) {

    return (

      <Box className="p-4">

        <Typography color="error">
          {error}
        </Typography>

        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          className="mt-3"
        >
          Retry
        </Button>

      </Box>

    );

  }


  return (

    <Box>

      {/* Dashboard Heading */}
      <Box className="flex flex-wrap justify-between items-center gap-3 mb-6">

        <Box>

          <Typography variant="h4" fontWeight="bold">
            Admin Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome to EventHub Admin Panel
          </Typography>

        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/admin/events/create")}
        >
          Create Event
        </Button>

      </Box>


      {/* Statistics Cards */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        {statistics.map((item) => (

          <Card
            key={item.title}
            elevation={1}
          >

            <CardContent>

              <Typography
                color="text.secondary"
                variant="body1"
              >
                {item.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color="primary"
                className="mt-2"
              >
                {item.value}
              </Typography>

            </CardContent>

          </Card>

        ))}

      </Box>


      {/* Recent Events */}
      <Box className="mb-4">

        <Box className="flex justify-between items-center mb-4">

          <Typography variant="h5" fontWeight="bold">
            Recent Events
          </Typography>

          <Button
            variant="outlined"
            onClick={() => navigate("/admin/events")}
          >
            View All
          </Button>

        </Box>


        <TableContainer component={Paper} elevation={1}>

          <Table>

            <TableHead>

              <TableRow sx={{ backgroundColor: "#F5F5F5" }}>

                <TableCell><b>Event Name</b></TableCell>

                <TableCell><b>Date</b></TableCell>

                <TableCell><b>Location</b></TableCell>

              </TableRow>

            </TableHead>


            <TableBody>

              {recentEvents.length > 0 ? (

                recentEvents.map((event) => (

                  <TableRow key={event._id || event.id}>

                    <TableCell>
                      {event.title || event.name || event.eventName || "Untitled Event"}
                    </TableCell>

                    <TableCell>
                      {formatDate(event.date || event.eventDate)}
                    </TableCell>

                    <TableCell>
                      {event.location || event.venue || "Not available"}
                    </TableCell>

                  </TableRow>

                ))

              ) : (

                <TableRow>

                  <TableCell colSpan={3} align="center">

                    No events available.

                  </TableCell>

                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </Box>

    </Box>

  );

}

export default AdminDashboard;
