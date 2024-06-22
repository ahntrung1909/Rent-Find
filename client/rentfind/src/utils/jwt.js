import { getDecodedToken, logout } from "../utils/auth";
import { userState } from "../recoil/atom";
import setAuthToken from "../utils/setAuthToken";

const refreshToken = async () => {};
const checkJwt = async () => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        setAuthToken(accessToken);
        const decoded = getDecodedToken();
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            let accessToken = false;
            if (!accessToken) {
                logout();
                return null;
            } else {
                localStorage.setItem("accessToken", accessToken);
                setAuthToken(accessToken);
                return decoded.id;
            }
        } else {
            return decoded.id;
        }
    }
};
export { checkJwt, refreshToken };
