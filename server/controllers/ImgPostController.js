const model = require("../models/index");
const ImgPost = model.ImgPost;

const ImgPostController = {
    getImage: async (req, res) => {
        // console.log("id: " + req.params.id);
        const imgPost = await ImgPost.findOne({
            where: { post_id: req.params.id },
        });
        console.log(imgPost);
        if (imgPost) {
            return res.json(imgPost);
        } else {
            return res.status(404).json({ message: "Không có người dùng!" });
        }
    },
};

module.exports = ImgPostController;
