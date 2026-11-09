import React from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Logout Function
    const handleLogout = () => {
        logout();
        alert("Logout Successful!");
        navigate("/login");
    };

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                color: "#222222",
                padding: "5px 30px",
                borderBottom: "1px solid #eeeeee"
            }}
        >
            <Toolbar>

                {/* Logo */}
                <Typography
                    variant="h5"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        fontWeight: "bold",
                        color: "#1976d2",
                        textDecoration: "none"
                    }}
                >
                    EventHub
                </Typography>

                {/* Navigation Links */}
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center"
                    }}
                >

                    {/* Common Links */}
                    <Button
                        component={Link}
                        to="/"
                        color="inherit"
                    >
                        Home
                    </Button>

                    <Button
                        component={Link}
                        to="/events"
                        color="inherit"
                    >
                        Events
                    </Button>

                    {/* Logged In User */}
                    {user ? (
                        <>

                            {/* User Name and Role */}
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "#333333"
                                }}
                            >
                                Hello, {user.name}
                            </Typography>

                            {/* Normal User Links */}
                            {user.role !== "admin" && (
                                <Button
                                    component={Link}
                                    to="/my-registrations"
                                    color="inherit"
                                >
                                    My Registrations
                                </Button>
                            )}

                            {/* Admin Dashboard */}
                            {user.role === "admin" && (
                                <Button
                                    component={Link}
                                    to="/admin"
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        borderRadius: "8px",
                                        textTransform: "none"
                                    }}
                                >
                                    Admin Dashboard
                                </Button>
                            )}

                            {/* Logout */}
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: "8px",
                                    textTransform: "none"
                                }}
                            >
                                Logout
                            </Button>

                        </>
                    ) : (

                        /* Guest Links */
                        <>
                            <Button
                                component={Link}
                                to="/login"
                                color="inherit"
                            >
                                Login
                            </Button>

                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
                                sx={{
                                    borderRadius: "8px",
                                    textTransform: "none"
                                }}
                            >
                                Register
                            </Button>
                        </>
                    )}

                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;