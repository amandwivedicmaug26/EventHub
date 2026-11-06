import { createContext, useContext, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    // Login Function
    const login = async (email, password) => {

        const response = await API.post("/auth/login", {
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setToken(token);
        setUser(user);

        return response.data;
    };

    // Register Function
    const register = async (name, email, password) => {

        const response = await API.post("/auth/register", {
            name,
            email,
            password
        });

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setToken(token);
        setUser(user);

        return response.data;
    };

    // Logout Function
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        delete API.defaults.headers.common["Authorization"];

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);