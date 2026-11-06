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
                padding: "5px 30px"
            }}
        >
            <Toolbar>

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

                <Box sx={{ display: "flex", gap: 2 }}>

                    <Button component={Link} to="/" color="inherit">
                        Home
                    </Button>

                    <Button component={Link} to="/events" color="inherit">
                        Events
                    </Button>

                    {user ? (
                        <>
                            <Typography sx={{ alignSelf: "center" }}>
                                Hello, {user.name}
                            </Typography>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button component={Link} to="/login" color="inherit">
                                Login
                            </Button>

                            <Button
                                component={Link}
                                to="/register"
                                variant="contained"
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