import React from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    Link,
    Divider
} from "@mui/material";

import EventAvailableIcon from "@mui/icons-material/EventAvailable";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#172033",
                color: "#ffffff",
                py: 5,
                mt: 8
            }}
        >
            <Container maxWidth="lg">

                <Grid container spacing={4}>

                    {/* About Section */}
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <EventAvailableIcon sx={{ fontSize: 30, color: "#64b5f6" }} />

                            <Typography variant="h5" fontWeight="bold">
                                EventHub
                            </Typography>
                        </Box>

                        <Typography
                            sx={{
                                mt: 2,
                                color: "#b0bec5",
                                lineHeight: 1.8
                            }}
                        >
                            Discover amazing events, connect with people
                            and make every moment memorable with EventHub.
                        </Typography>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Quick Links
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Link href="/" color="inherit" underline="hover">
                                Home
                            </Link>

                            <Link href="/events" color="inherit" underline="hover">
                                Explore Events
                            </Link>

                            <Link href="/login" color="inherit" underline="hover">
                                Login
                            </Link>

                            <Link href="/register" color="inherit" underline="hover">
                                Register
                            </Link>
                        </Box>
                    </Grid>

                    {/* Contact Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Contact Us
                        </Typography>

                        <Typography sx={{ color: "#b0bec5", mb: 1 }}>
                            Email: support@eventhub.com
                        </Typography>

                        <Typography sx={{ color: "#b0bec5" }}>
                            Location: India
                        </Typography>
                    </Grid>

                </Grid>

                <Divider sx={{ my: 4, borderColor: "#455a64" }} />

                {/* Copyright */}
                <Typography
                    textAlign="center"
                    sx={{ color: "#b0bec5" }}
                >
                    © {new Date().getFullYear()} EventHub.
                    All Rights Reserved.
                </Typography>

            </Container>
        </Box>
    );
}

export default Footer;