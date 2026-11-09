import React from "react";

import {
    Box,
    Typography,
    Button,
    Divider
} from "@mui/material";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminSidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const { logout } = useAuth();

    // Sidebar Menu Items
    const menuItems = [
        {
            title: "Dashboard",
            path: "/admin/dashboard",
            icon: "📊"
        },
        {
            title: "Create Event",
            path: "/admin/events/create",
            icon: "➕"
        },
        {
            title: "Manage Events",
            path: "/admin/events",
            icon: "📅"
        },
        {
            title: "All Registrations",
            path: "/admin/registrations",
            icon: "👥"
        }
    ];

    // Logout Function
    const handleLogout = () => {
        logout();
        alert("Admin Logout Successful!");
        navigate("/login");
    };

    return (
        <Box
            sx={{
                width: 250,
                minHeight: "80vh",
                backgroundColor: "#172033",
                color: "#ffffff",
                p: 2,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column"
            }}
        >

            {/* Sidebar Heading */}
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    p: 2,
                    color: "#64b5f6"
                }}
            >
                Admin Panel
            </Typography>

            <Divider
                sx={{
                    borderColor: "#455a64",
                    mb: 2
                }}
            />

            {/* Sidebar Menu */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    flexGrow: 1
                }}
            >

                {menuItems.map((item) => {

                    const isActive = location.pathname === item.path;

                    return (
                        <Button
                            key={item.path}
                            component={Link}
                            to={item.path}
                            fullWidth
                            sx={{
                                justifyContent: "flex-start",
                                color: "#ffffff",

                                backgroundColor: isActive
                                    ? "#1976d2"
                                    : "transparent",

                                padding: "12px 15px",
                                textTransform: "none",
                                borderRadius: 2,

                                "&:hover": {
                                    backgroundColor: "#263b5c"
                                }
                            }}
                        >

                            <span style={{ marginRight: "12px" }}>
                                {item.icon}
                            </span>

                            {item.title}

                        </Button>
                    );
                })}

            </Box>

            {/* Bottom Actions */}
            <Divider
                sx={{
                    borderColor: "#455a64",
                    my: 2
                }}
            />

            {/* Back To Website */}
            <Button
                component={Link}
                to="/"
                fullWidth
                sx={{
                    color: "#ffffff",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    padding: "12px 15px",
                    borderRadius: 2,

                    "&:hover": {
                        backgroundColor: "#263b5c"
                    }
                }}
            >
                🏠 Back to Website
            </Button>

            {/* Logout Button */}
            <Button
                fullWidth
                onClick={handleLogout}
                sx={{
                    color: "#ff8a80",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    padding: "12px 15px",
                    borderRadius: 2,

                    "&:hover": {
                        backgroundColor: "#263b5c"
                    }
                }}
            >
                🚪 Logout
            </Button>

        </Box>
    );
}

export default AdminSidebar;