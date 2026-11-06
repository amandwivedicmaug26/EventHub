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

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            await login(email, password);

            alert("Login Successful!");

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message || "Login failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">

            <Paper
                elevation={4}
                className="w-full max-w-md p-8 rounded-2xl"
            >

                <Typography
                    variant="h4"
                    className="text-center font-bold text-blue-600 mb-2"
                >
                    Welcome Back!
                </Typography>

                <Typography
                    className="text-center text-gray-500 mb-8"
                >
                    Login to your EventHub account
                </Typography>

                <form onSubmit={handleSubmit}>

                    {/* Email */}
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password */}
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
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />

                    {/* Error Message */}
                    {error && (
                        <Typography className="text-red-600 mt-3">
                            {error}
                        </Typography>
                    )}

                    {/* Login Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 3, py: 1.5 }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>

                </form>

                {/* Register Link */}
                <Typography className="text-center mt-6">
                    Don't have an account?
                    {" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold no-underline"
                    >
                        Register
                    </Link>
                </Typography>

            </Paper>

        </div>
    );
}

export default Login;