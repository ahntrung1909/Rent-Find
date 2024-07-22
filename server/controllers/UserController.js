const { v4 } = require("uuid");
const model = require("../models/index");
const User = model.User;
const { Op } = require("sequelize");
const messages = require("../models/messages");
const Addresses = model.Addresses;
const Messages = model.Messages;

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
    getAllUsers: async (req, res) => {
        // check lại
        const senderId = req.params.senderId;
        const currentUserId = req.user.dataValues.id;
        try {
            // const users = await User.findAll({
            //     where: {
            //         id: {
            //             [Op.ne]: senderId.toString(), // Loại trừ user có id là senderId
            //         },
            //         role: "user",
            //     },
            //     include: [
            //         {
            //             model: Messages,
            //             as: "ReceiverMessages",
            //         },
            //         {
            //             model: Messages,
            //             as: "SenderMessages",
            //         },
            //     ],
            // });
            const messages = await Messages.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: senderId },
                        { receiver_id: senderId },
                    ],
                },
                include: [
                    {
                        model: User,
                        as: "ReceiverUser", // Tên alias của quan hệ
                        attributes: ["id", "full_name", "email"], // Các trường cần lấy của User
                    },
                    {
                        model: User,
                        as: "SenderUser", // Tên alias của quan hệ
                        attributes: ["id", "full_name", "email"], // Các trường cần lấy của User
                    },
                ],
                order: [
                    ["send_at", "ASC"], // ASC cho thứ tự tăng dần, DESC cho thứ tự giảm dần
                ],
            });
            console.log("mess" + messages);

            let messageData = [];
            for (let i = 0; i < messages.length; i++) {
                let receiverMessId = messages[i].dataValues.receiver_id;
                let senderMessId = messages[i].dataValues.sender_id;
                if (senderId === receiverMessId) {
                    let data = {
                        id: senderMessId,
                        full_name:
                            messages[i].dataValues.SenderUser.dataValues
                                .full_name,
                        email: messages[i].dataValues.SenderUser.dataValues
                            .email,
                        lastMessage: messages[i].dataValues.content,
                        isYourMessage: false,
                    };
                    messageData = messageData.filter((messData) => {
                        return messData.id !== senderMessId;
                    });
                    messageData.unshift(data);
                } else if (senderId === senderMessId) {
                    let data = {
                        id: receiverMessId,
                        full_name:
                            messages[i].dataValues.ReceiverUser.dataValues
                                .full_name,
                        email: messages[i].dataValues.ReceiverUser.dataValues
                            .email,
                        lastMessage: messages[i].dataValues.content,
                        isYourMessage: true,
                    };
                    messageData = messageData.filter((messData) => {
                        return messData.id !== receiverMessId;
                    });
                    messageData.unshift(data);
                }
            }
            console.log("messdata", messageData);
            res.status(200).json({ messageData }); //users
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                message: "An error occurred while fetching users",
                error: error.message,
            });
        }
    },
    searchUserByFullName: async (req, res) => {
        try {
            const fullName = req.params.slug;
            const userConditions = {
                role: "user", //k được
            };

            if (fullName) {
                userConditions.full_name =
                    (Sequelize.fn("unaccent", Sequelize.col("full_name")),
                    {
                        [Sequelize.Op.iLike]: `%${fullName}%`,
                    });
            }

            const user = await User.findAndCountAll({
                where: userConditions,
            });

            return res.status(200).json({
                message: "Successfully fetched all posts",
                data: user.rows,
                count: user.count,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
};

module.exports = UserController;
