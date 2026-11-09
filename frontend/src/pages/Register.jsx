import React, { useState } from "react";

import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await register(
                formData.name,
                formData.email,
                formData.password
            );

            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>

            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                >
                    Create Account
                </Typography>

                <Typography
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Join EventHub and explore amazing events
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoComplete="name"
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoComplete="email"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">

                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        onMouseDown={(e) => e.preventDefault()}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>

                                </InputAdornment>
                            )
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.3 }}
                    >
                        Register
                    </Button>

                </Box>

                <Typography textAlign="center" mt={3}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        Login
                    </Link>
                </Typography>

            </Paper>

        </Container>
    );
}

export default Register;