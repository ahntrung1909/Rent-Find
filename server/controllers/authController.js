const { json } = require("sequelize");
const model = require("../models/index");
const User = model.User;
const { v4 } = require("uuid");

const authController = {
    //[POST] /users/handle-form-create
    signUp: async (req, res, next) => {
        // Xác định id cho phần tử mới
        const newId = v4();

        // const user = await User.create({
        //     id: newId,
        //     email: req.body.email,
        //     full_name: req.body.fullName,
        //     password: req.body.password,
        //     phone_number: req.body.phoneNumber,
        //     dob: req.body.dob,
        // });
        console.log(req.body);
        res.json("dangg ki thanh cong");
    },
};

module.exports = {
    authController,
};
