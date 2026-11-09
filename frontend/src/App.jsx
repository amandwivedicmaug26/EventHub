import React from "react";

import {
    Routes,
    Route,
    useLocation,
    Outlet,
    Navigate
} from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminSidebar from "./components/AdminSidebar";

// User Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyRegistrations from "./pages/MyRegistrations";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import CreateEvent from "./pages/admin/CreateEvent";
import EditEvent from "./pages/admin/EditEvent";
import AllRegistrations from "./pages/admin/AllRegistrations";


// Admin Layout
const AdminLayout = () => {

    return (
        <div
            style={{
                display: "flex",
                minHeight: "80vh"
            }}
        >

            <AdminSidebar />

            <div
                style={{
                    flex: 1,
                    padding: "25px"
                }}
            >
                <Outlet />
            </div>

        </div>
    );
};


// Main App
const App = () => {

    const location = useLocation();

    const isAdminPage = location.pathname.startsWith("/admin");

    return (
        <>

            {/* Navbar */}
            {!isAdminPage && <Navbar />}

            <Routes>

                {/* User Routes */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/events"
                    element={<Events />}
                />

                {/* Event Details Route */}
                <Route
                    path="/events/:id"
                    element={<EventDetails />}
                />

                {/* My Registrations */}
                <Route
                    path="/my-registrations"
                    element={<MyRegistrations />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Admin Routes */}

                <Route
                    path="/admin"
                    element={<AdminLayout />}
                >

                    <Route
                        index
                        element={<Navigate to="dashboard" replace />}
                    />

                    <Route
                        path="dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="events"
                        element={<ManageEvents />}
                    />

                    <Route
                        path="events/create"
                        element={<CreateEvent />}
                    />

                    <Route
                        path="events/edit/:id"
                        element={<EditEvent />}
                    />

                    <Route
                        path="registrations"
                        element={<AllRegistrations />}
                    />

                </Route>

            </Routes>

            {/* Footer */}
            {!isAdminPage && <Footer />}

        </>
    );
};

export default App;