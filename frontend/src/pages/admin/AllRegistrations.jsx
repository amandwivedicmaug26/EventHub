
import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";

import API from "../../services/api";

function AllRegistrations() {

  const [registrations, setRegistrations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // Fetch all registrations
  const fetchRegistrations = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await API.get("/registrations", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRegistrations(response.data.registrations || []);

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
        "Unable to fetch registrations."
      );

    } finally {

      setLoading(false);

    }

  };


  // Load registrations when page opens
  useEffect(() => {

    fetchRegistrations();

  }, []);


  // Format date
  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleDateString("en-IN");

  };


  // Loading screen
  if (loading) {

    return (

      <Box className="flex justify-center p-10">

        <CircularProgress />

      </Box>

    );

  }


  return (

    <Box>

      {/* Page Heading */}
      <Box className="mb-6">

        <Typography variant="h4" fontWeight="bold">
          All Registrations
        </Typography>

        <Typography color="text.secondary">
          View all user event registrations
        </Typography>

      </Box>


      {/* Total Registrations */}
      <Box className="mb-6">

        <Paper elevation={1} className="p-4">

          <Typography color="text.secondary">
            Total Registrations
          </Typography>

          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
          >
            {registrations.length}
          </Typography>

        </Paper>

      </Box>


      {/* Error Message */}
      {error && (

        <Alert severity="error" className="mb-4">

          {error}

          <Button
            size="small"
            onClick={fetchRegistrations}
          >
            Retry
          </Button>

        </Alert>

      )}


      {/* Registration Table */}
      <TableContainer component={Paper} elevation={1}>

        <Table>

          <TableHead>

            <TableRow sx={{ backgroundColor: "#F5F5F5" }}>

              <TableCell><b>User Name</b></TableCell>

              <TableCell><b>Email</b></TableCell>

              <TableCell><b>Event Name</b></TableCell>

              <TableCell><b>Event Date</b></TableCell>

              <TableCell><b>Registration Date</b></TableCell>

              <TableCell><b>Status</b></TableCell>

            </TableRow>

          </TableHead>


          <TableBody>

            {registrations.length > 0 ? (

              registrations.map((registration) => (

                <TableRow key={registration._id}>

                  {/* User Name */}
                  <TableCell>
                    {registration.user?.name || "Unknown"}
                  </TableCell>


                  {/* Email */}
                  <TableCell>
                    {registration.user?.email || "Not available"}
                  </TableCell>


                  {/* Event Name */}
                  <TableCell>
                    {registration.event?.title || "Event unavailable"}
                  </TableCell>


                  {/* Event Date */}
                  <TableCell>
                    {formatDate(registration.event?.date)}
                  </TableCell>


                  {/* Registration Date */}
                  <TableCell>
                    {formatDate(registration.registrationDate)}
                  </TableCell>


                  {/* Registration Status */}
                  <TableCell>

                    <Chip
                      label={registration.status}
                      color={
                        registration.status === "confirmed"
                          ? "success"
                          : "error"
                      }
                      size="small"
                    />

                  </TableCell>

                </TableRow>

              ))

            ) : (

              <TableRow>

                <TableCell colSpan={6} align="center">

                  No registrations available.

                </TableCell>

              </TableRow>

            )}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

}

export default AllRegistrations;
