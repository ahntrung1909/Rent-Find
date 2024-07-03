const model = require("../models/index");
const Addresses = model.Addresses;

const AddressesController = {
    getInfo: async (req, res) => {
        const address = await Addresses.findOne({
            where: { id: req.params.id },
        });
        if (address) {
            return res.json(address);
        } else {
            return res.status(404).json({ message: "Không có địa chỉ!" });
        }
    },
};

module.exports = AddressesController;
