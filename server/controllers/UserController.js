const model = require("../models/index");
const User = model.User;

const UserController = {
    getInfo: async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            return res.json(user);
        } else {
            return res.status(404).json({ message: "Không có người dùng!" });
        }
    },
};

module.exports = UserController;
