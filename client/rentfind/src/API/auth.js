import axios from "axios";

const getTokenByRefreshToken = async () => {
    try {
        const res = await axios.post(
            `http://localhost:3000/api/auth/refresh-token`,
            {
                withCredentials: true,
            }
        );
        if (res.status === 200) {
            return res.data.accessToken;
        }
        return null;
    } catch (error) {
        console.log("error", error);
    }
};

export { getTokenByRefreshToken };
