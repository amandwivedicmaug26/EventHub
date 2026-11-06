import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>

       {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-900 to-blue-500 text-white px-10 py-24 text-center">

                <h1 className="text-5xl font-bold mb-6">
                    Welcome to EventHub
                </h1>

                <p className="text-lg mb-8">
                    Discover Amazing Events. Create Memories.
                </p>

                <Button
                    component={Link}
                    to="/events"
                    variant="contained"
                    sx={{
                        backgroundColor: "#ffffff",
                        color: "#1976d2",
                        padding: "12px 30px",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#eeeeee"
                        }
                    }}
                >
                    Explore Events
                </Button>

            </section>

            {/* About Section */}
            <section className="px-10 py-16 text-center">

                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    About EventHub
                </h2>

                <p className="text-gray-600 max-w-2xl mx-auto">
                    EventHub is your one-stop platform to discover,
                    explore and register for exciting events.
                    Find workshops, seminars, concerts and more.
                </p>

            </section>

            {/* Features Section */}
            <section className="bg-gray-100 px-10 py-16">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Why Choose EventHub?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-bold mb-3">
                            Discover Events
                        </h3>
                        <p className="text-gray-600">
                            Explore different events based on your interests.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-bold mb-3">
                            Easy Registration
                        </h3>
                        <p className="text-gray-600">
                            Register for your favourite events easily.
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-md text-center">
                        <h3 className="text-xl font-bold mb-3">
                            Manage Events
                        </h3>
                        <p className="text-gray-600">
                            Manage and organize events in one place.
                        </p>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;