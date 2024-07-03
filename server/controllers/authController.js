const model = require("../models/index");
const User = model.User;
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { createAccessToken, createRefreshToken } = require("../config/passport");
const createTransport = require("../utils/createTransport");
const NodeCache = require("node-cache");
const { where } = require("sequelize");
const myCache = new NodeCache();

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
    changePassword: async (req, res) => {
        const { oldPassword, newPassword, reNewPassword } = req.body;
        const currentUserPassword = req.user.dataValues.password;
        const currentUserEmail = req.user.dataValues.email;
        // const currentUser = req.user.dataValues;
        // console.log(currentUser);

        if (currentUserPassword !== oldPassword) {
            return res.status(500).json({
                message: "Mật khẩu cũ không trùng khớp!",
            });
        }
        if (newPassword !== reNewPassword) {
            return res.status(500).json({
                message: "Mật khẩu mới không trùng khớp!",
            });
        }

        try {
            const result = await User.update(
                { password: newPassword },
                { where: { email: currentUserEmail } }
            );
            return res.status(200).json({ message: "Đổi mật khẩu thành công" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    logout: async (req, res) => {},
    getResetCode: async (req, res) => {
        try {
            const { email } = req.body;
            const transport = await createTransport();
            const code = v4();
            myCache.set("resetCode", code, 3000);
            myCache.set("resetEmail", email, 3000);

            const mailOptions = {
                to: email,
                subject: "Mã xác nhận mật khẩu",
                html: `
                    <h2>Xin chào người dùng ${email}</h2> 
                    <h2>Có phải bạn vừa nhấn quên mật khẩu?</h2>
                    <p>Nhập đoạn mã sau đây để có thể reset mật khẩu: ${code}</p>
                    <p>Thân ái,</p>
                    <p>Đội ngũ CSKH RendFind</p>
                `,
            };
            await transport.sendMail(mailOptions);
            res.status(200).json({ message: "Gửi mail thành công" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    checkCodeReset: (req, res) => {
        try {
            const { code } = req.body;
            const codeSave = myCache.take("resetCode");
            // console.log("codeSave", codeSave);
            // console.log("code", code);
            if (codeSave === code) {
                myCache.del("resetCode");
                return res
                    .status(200)
                    .json({ message: "Xác nhận thành công!" });
            } else {
                return res.status(400).json({ message: "Xác nhận thất bại!" });
            }
        } catch (error) {
            return res.status(500).json({ errors: error.message });
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body;
            const resetEmail = myCache.take("resetEmail");
            console.log(resetEmail);
            const result = await User.update(
                { password: password },
                { where: { email: resetEmail } }
            );
            return res.status(200).json({ message: "Đổi mật khẩu thành công" });
        } catch (error) {
            return res.status(500).json({ errors: error.message });
        }
    },
};

module.exports = authController;
