import axios from "axios";

const sendRequest = async (method, route, body = {}, needsAuth = true) => {
    try {
        axios.defaults.baseURL = "http://18.219.38.17:8000/api";

        const headers = {
            "Content-Type": "application/json"
        };

        let authTokens = JSON.parse(localStorage.getItem('authTokens'));
        if (needsAuth && authTokens?.access) {
            const accessToken = authTokens?.access;
            headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await axios.request({
            method,
            url: route,
            data: body,
            headers
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export default sendRequest;
