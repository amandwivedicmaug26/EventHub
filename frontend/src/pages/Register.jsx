import React, { useState } from "react";

import {
    TextField,
    Button,
    Paper,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        if (name.trim().length < 3) {
            setError("Name must contain at least 3 characters");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            await register(name, email, password);

            alert("Registration Successful!");

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">

            <Paper elevation={4} className="w-full max-w-md p-8 rounded-2xl">

                <Typography
                    variant="h4"
                    className="text-center font-bold text-blue-600 mb-2"
                >
                    Create Account
                </Typography>

                <Typography className="text-center text-gray-500 mb-8">
                    Join EventHub and explore amazing events
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        {showPassword
                                            ? <VisibilityOff />
                                            : <Visibility />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {error && (
                        <Typography className="text-red-600 mt-3">
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </Button>

                </form>

                <Typography className="text-center mt-6">

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-blue-600 font-semibold no-underline"
                    >
                        Login
                    </Link>

                </Typography>

            </Paper>

        </div>
    );
}

export default Register;