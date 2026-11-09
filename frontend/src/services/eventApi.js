import API from "./api";

// 1. Get All Events
export const getAllEvents = async () => {
    const response = await API.get("/events");
    return response.data;
};

// 2. Get Single Event By ID
export const getEventById = async (id) => {
    const response = await API.get(`/events/${id}`);
    return response.data;
};

// 3. Register For Event
export const registerForEvent = async (eventId, token) => {
    const response = await API.post(
        `/registrations/${eventId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// 4. Get My Registrations
export const getMyRegistrations = async (token) => {
    const response = await API.get(
        "/registrations/my-registrations",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};