import React from "react";

import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {

    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/events/${event._id}`);
    };

    return (
        <Card
            elevation={3}
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6
                }
            }}
        >

            {/* Event Image */}
            <CardMedia
                component="img"
                height="200"
                image={
                    event.image ||
                    "https://placehold.co/600x400?text=EventHub"
                }
                alt={event.title}
            />

            <CardContent sx={{ flexGrow: 1 }}>

                {/* Category */}
                <Chip
                    label={event.category || "General"}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                />

                {/* Event Title */}
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    {event.title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {event.description
                        ? event.description.slice(0, 100) + "..."
                        : "No description available."}
                </Typography>

                {/* Date */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarMonthIcon fontSize="small" color="action" />

                    <Typography variant="body2">
                        {event.date
                            ? new Date(event.date).toLocaleDateString("en-IN")
                            : "Date not available"}
                    </Typography>
                </Box>

                {/* Venue */}
                <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" color="action" />

                    <Typography variant="body2">
                        {event.venue || "Venue not available"}
                    </Typography>
                </Box>

                {/* Price */}
                <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="bold"
                    sx={{ mt: 2 }}
                >
                    {Number(event.price) === 0
                        ? "Free"
                        : `₹${event.price}`}
                </Typography>

            </CardContent>

            {/* View Details Button */}
            <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleViewDetails}
                >
                    View Details
                </Button>
            </CardActions>

        </Card>
    );
}

export default EventCard;