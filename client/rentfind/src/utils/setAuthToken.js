import axios from "axios";

export default function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token; // Add space after Bearer
        axios.defaults.withCredentials = true;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}
