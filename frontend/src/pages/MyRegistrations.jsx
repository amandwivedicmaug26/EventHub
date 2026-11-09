import React, { useEffect, useState } from "react";

import {
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    CircularProgress,
    Alert,
    Button,
    Chip
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyRegistrations() {

    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await API.get(
                "/registrations/my-registrations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRegistrations(
                response.data.registrations || []
            );

        } catch (err) {
            console.log(err);
            setError("Unable to load your registrations.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress sx={{ m: 5 }} />;
    }

    return (
        <Container sx={{ mt: 5, mb: 5 }}>

            <Typography variant="h4" fontWeight="bold" mb={3}>
                My Registrations
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {!error && registrations.length === 0 && (
                <Typography>
                    You have not registered for any events yet.
                </Typography>
            )}

            <Grid container spacing={3}>

                {registrations.map((registration) => {

                    const event = registration.event;

                    if (!event) return null;

                    return (
                        <Grid item xs={12} sm={6} md={4}
                            key={registration._id}>

                            <Card>
                                <CardContent>

                                    <Typography variant="h6" fontWeight="bold">
                                        {event.title}
                                    </Typography>

                                    <Typography mt={1}>
                                        Venue: {event.venue}
                                    </Typography>

                                    <Typography>
                                        Date: {new Date(event.date).toLocaleDateString()}
                                    </Typography>

                                    <Chip
                                        label={registration.status || "Confirmed"}
                                        color="success"
                                        sx={{ mt: 2 }}
                                    />

                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 2 }}
                                        onClick={() =>
                                            navigate(`/events/${event._id}`)
                                        }
                                    >
                                        View Event
                                    </Button>

                                </CardContent>
                            </Card>

                        </Grid>
                    );
                })}

            </Grid>

        </Container>
    );
}

export default MyRegistrations;