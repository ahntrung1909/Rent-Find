const { json, where } = require("sequelize");
const model = require("../models/index");
const User = model.User;
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createAccessToken, createRefreshToken } = require("../config/passport");
const cookieParser = require("cookie-parser");

const authController = {
    //[POST] http://localhost:3000/api/auth/sign-up
    signUp: async (req, res, next) => {
        // Xác định id cho phần tử mới
        const newId = v4();
        const { email, fullName, password, phoneNumber, dob } = req.body;
        User.findOne({ where: { email: email } }).then((user) => {
            if (user) {
                return res
                    .status(400)
                    .json({ message: "Tài khoản đã tồn tại" });
            } else {
                const newUser = {
                    id: newId,
                    email: email,
                    full_name: fullName,
                    password: password,
                    phone_number: phoneNumber,
                    dob: dob,
                };
                User.create(newUser)
                    .then((user) => {
                        res.json(user);
                    })
                    .catch((err) => console.log(err));
            }
        });
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then((user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ message: "Tài khoản không tồn tại!" });
                }

                if (user.password !== password) {
                    // Ensure you're handling password hashing properly in a real app
                    return res.status(400).json({
                        message: "Tài khoản hoặc mật khẩu không chính xác!",
                    });
                }

                const accessToken = createAccessToken(user);
                const refreshToken = createRefreshToken(user);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    sameSite: "strict", // Helps prevent CSRF attacks
                    maxAge: 3 * 24 * 60 * 60 * 1000, // 1 day
                });

                return res.json({ success: true, accessToken });
            })
            .catch((err) => {
                console.error(err);
                return res
                    .status(500)
                    .json({ message: "Internal server error" });
            });
    }, //decoded accessToken ở phía be và lấy ra id
    refreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log(refreshToken);
            if (!refreshToken) {
                return res.status(403).json({ msg: "Authorization thất bại" });
            }

            jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET,
                async (err, decoded) => {
                    if (err) {
                        return res
                            .status(403)
                            .json({ msg: "Authorization thất bại" });
                    }

                    // Assuming the JWT payload contains the user ID
                    const user = await User.findByPk(decoded.id);
                    if (!user) {
                        return res
                            .status(403)
                            .json({ msg: "Authorization thất bại" });
                    }

                    const newAccessToken = createAccessToken(user);
                    res.json({ accessToken: newAccessToken });
                }
            );
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Internal server error" });
        }
    },
    changePassword: async (req, res) => {},
    logout: async (req, res) => {},
};

module.exports = authController;
