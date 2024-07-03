const { v4 } = require("uuid");
const model = require("../models/index");
const User = model.User;
const Addresses = model.Addresses;

const UserController = {
    getInfo: async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: "Không có người dùng!" });
        }
    },
    updateInfo: async (req, res) => {
        const newId1 = v4();
        const currentUserId = req.user.dataValues.id;
        const {
            fullName,
            dob,
            phoneNumber,
            city,
            district,
            ward,
            description,
        } = req.body;

        try {
            await User.update(
                {
                    dob: dob,
                    full_name: fullName,
                    phone_number: phoneNumber,
                    user_address_id: newId1,
                },
                {
                    where: {
                        id: currentUserId,
                    },
                }
            );
            res.status(200).json({
                message: "User information updated successfully",
            });
        } catch (error) {
            console.error("Error updating user information:", error);
            res.status(500).json({
                message: "An error occurred while updating user information",
                error: error,
            });
        }
    },
};

module.exports = UserController;
