const { v4 } = require("uuid");
const model = require("../models/index");
const User = model.User;
const { Op } = require("sequelize");
const Addresses = model.Addresses;
const Messages = model.Messages;

const MessageController = {
    //thiếu 1 case khi bấm vào thg đã có tin nhắn rỗng nhưng khi bấm vào ntin trong details thì messenger kh hiện thằng đó => sắp xếp lại db
    uploadMessage: async (req, res) => {
        const newId = v4();
        const { content, senderId, receiverId, seen } = req.body;

        try {
            if (seen) {
                let result = await Messages.findAll({
                    where: {
                        sender_id: senderId,
                        receiver_id: receiverId,
                    },
                });
                if (result.length < 1) {
                    await Messages.create({
                        id: newId,
                        sender_id: senderId,
                        receiver_id: receiverId,
                        content: "",
                        seen,
                        send_at: Date.now(),
                    });
                    return res.status(200).json({
                        message: "Messages created successfully",
                    });
                }
            } else {
                await Messages.create({
                    id: newId,
                    sender_id: senderId,
                    receiver_id: receiverId,
                    content: content.trim(),
                    send_at: Date.now(),
                });
                return res.status(200).json({
                    message: "Messages created successfully",
                });
            }
        } catch (error) {
            console.log("Error inserting data: ", error);
            return res.status(500).json({
                message: "An error occurred",
                error: error,
            });
        }
    },
};

module.exports = MessageController;
