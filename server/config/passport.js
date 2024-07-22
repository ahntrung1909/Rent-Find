const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

const createRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = {
    createAccessToken,
    createRefreshToken,
};
