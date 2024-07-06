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
        console.log(currentUserId);
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
            // Tìm người dùng hiện tại
            const user = await User.findByPk(currentUserId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Cập nhật thông tin người dùng
            user.full_name = fullName;
            user.dob = dob;
            user.phone_number = phoneNumber;

            if (!user.user_address_id) {
                // Nếu user_address_id là null, tạo một địa chỉ mới
                const newAddress = await Addresses.create({
                    id: newId1,
                    city,
                    district,
                    ward,
                    description,
                });

                // Cập nhật user_address_id của người dùng
                user.user_address_id = newAddress.id;
            } else {
                // Nếu user_address_id đã tồn tại, cập nhật bản ghi địa chỉ hiện tại
                await Addresses.update(
                    {
                        city,
                        district,
                        ward,
                        description,
                    },
                    {
                        where: {
                            id: user.user_address_id,
                        },
                    }
                );
            }

            // Lưu thay đổi vào cơ sở dữ liệu
            await user.save();

            return res
                .status(200)
                .json({ message: "User information updated successfully" });
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
