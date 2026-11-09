import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Chip,
    CircularProgress,
    Alert
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { getEventById, registerForEvent } from "../services/eventApi";

function EventDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getEventById(id);
                setEvent(data.event || data);

            } catch (err) {
                console.error("Event Details Error:", err.response?.data || err);
                setError(
                    err.response?.data?.message ||
                    "Unable to load event details."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    const handleRegistration = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setRegistering(true);
            setError("");
            setMessage("");

            const response = await registerForEvent(id, token);

            setMessage(response.message || "Registration successful!");

        } catch (err) {
            console.error("Registration Error:", err.response?.data || err);

            setError(
                err.response?.data?.message ||
                "Registration failed."
            );
        } finally {
            setRegistering(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!event) {
        return (
            <Container sx={{ py: 5 }}>
                <Alert severity="error">
                    {error || "Event not found."}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>

                <Box
                    component="img"
                    src={event.image || "https://placehold.co/900x400?text=EventHub"}
                    alt={event.title}
                    sx={{
                        width: "100%",
                        height: 320,
                        objectFit: "cover",
                        borderRadius: 2,
                        mb: 3
                    }}
                />

                <Chip
                    label={event.category || "General"}
                    color="primary"
                    sx={{ mb: 2 }}
                />

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    {event.title}
                </Typography>

                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {event.description || "No description available."}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <CalendarMonthIcon color="action" />
                    <Typography>
                        {event.date
                            ? new Date(event.date).toLocaleDateString("en-IN")
                            : "Date not available"}
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <LocationOnIcon color="action" />
                    <Typography>
                        {event.venue || "Venue not available"}
                    </Typography>
                </Box>

                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                    {Number(event.price) === 0
                        ? "Free"
                        : `₹${event.price}`}
                </Typography>

                {message && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {message}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Button
                    variant="contained"
                    onClick={handleRegistration}
                    disabled={registering}
                    sx={{
                        backgroundColor: "#6C4CF1",
                        textTransform: "none",
                        px: 4
                    }}
                >
                    {registering ? "Registering..." : "Register for Event"}
                </Button>

            </Paper>
        </Container>
    );
}

export default EventDetails;