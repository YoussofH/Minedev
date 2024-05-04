"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sendRequest = async (method, route, body) => {
    try {
        axios_1.default.defaults.baseURL = "https://663534ca9bb0df2359a41dae.mockapi.io/api/";
        const response = await axios_1.default.request({
            method: method,
            url: route,
            data: body,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    }
    catch (error) {
        throw error;
    }
};
exports.default = sendRequest;
//# sourceMappingURL=sendRequest.js.map