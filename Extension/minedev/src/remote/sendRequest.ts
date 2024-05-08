import axios from "axios";

const sendRequest = async (method: any, route: any, body: any) => {
    try {
        axios.defaults.baseURL = "http://13.58.31.202:8000/api/";

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
