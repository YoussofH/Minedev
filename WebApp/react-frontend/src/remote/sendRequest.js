import axios from "axios";

const sendRequest = async (method, route, body) => {
    try {
        axios.defaults.baseURL = "http://18.219.38.17:8000/api";

        const response = await axios.request({
            method: method,
            url: route,
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
        });

        return response;
    } catch (error) {
        throw error;
    }
};

export default sendRequest;
