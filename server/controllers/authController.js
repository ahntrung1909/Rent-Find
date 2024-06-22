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
        User.findOne({ where: { email: email } }).then((user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Tài khoản không tồn tại! " });
            } else {
                if (user.password !== password) {
                    return res.status(400).json({
                        message: "Tài khoản hoặc mật khẩu không chính xác!",
                    });
                }
                const accessToken = createAccessToken(user);
                const refreshToken = createRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    path: "/api/auth/refresh-token",
                });
                return res.json({ success: true, accessToken });
            }
        });
    },
    refreshToken: async (req, res) => {},
    changePassword: async (req, res) => {},
    logout: async (req, res) => {},
};

module.exports = {
    authController,
};
