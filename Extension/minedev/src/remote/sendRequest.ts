import axios from "axios";

const sendRequest = async (method: any, route: any, body: any) => {
  try {
    axios.defaults.baseURL = "https://663534ca9bb0df2359a41dae.mockapi.io/api/";

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
