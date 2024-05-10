import axios from "axios";

const sendRequest = async (method, route, body, needsAuth = true) => {
    try {
        axios.defaults.baseURL = "http://18.219.38.17:8000/api";

        const headers = {
            "Content-Type": "application/json"
        };

        if (needsAuth && localStorage.getItem('authTokens')?.access) {
            const accessToken = localStorage.getItem('authTokens')?.access;
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.request({
            method,
            url: route,
            data: body,
            headers
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export default sendRequest;
