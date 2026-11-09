
import React, { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Box,
    CircularProgress,
    Alert
} from "@mui/material";

import EventCard from "../components/EventCard";
import { getAllEvents } from "../services/eventApi";

function Events() {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const data = await getAllEvents();
            setEvents(data.events || []);
        } catch (err) {
            console.log("Events Error:", err);
            setError("Unable to load events. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Box sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 5, mb: 5 }}>

            <Typography variant="h4" fontWeight="bold" mb={1}>
                Explore Events
            </Typography>

            <Typography color="text.secondary" mb={4}>
                Discover and register for upcoming events.
            </Typography>

            {error && (
                <Alert severity="error">{error}</Alert>
            )}

            {!error && events.length === 0 && (
                <Typography>
                    No events available right now.
                </Typography>
            )}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)"
                    },
                    gap: 3
                }}
            >
                {events.map((event) => (
                    <EventCard
                        key={event._id}
                        event={event}
                    />
                ))}
            </Box>

        </Container>
    );
}

export default Events;
