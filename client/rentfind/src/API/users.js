import axios from "axios";

const getUserProfile = async (id) => {
    try {
        const data = await axios.get(
            `http://localhost:3000/api/user/user-information/${id}`
        );
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

export { getUserProfile };
