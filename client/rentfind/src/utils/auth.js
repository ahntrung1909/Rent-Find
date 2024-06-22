import { jwtDecode } from "jwt-decode";
import setAuthToken from "./setAuthToken";

const getDecodedToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        return jwtDecode(token);
    }
    return null;
};

const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthToken(false);
};

export { getDecodedToken, logout };
