const { where } = require("sequelize");
const model = require("../models/index");
const { v4 } = require("uuid");
const Posts = model.Posts;
const Addresses = model.Addresses;
const ImgPost = model.ImgPost;

const PostController = {
    uploadPost: (req, res) => {
        const newId1 = v4();
        const newId2 = v4();
        const currentUserId = req.user.dataValues.id;
        const {
            city,
            description,
            district,
            postDescription,
            price,
            title,
            ward,
            image,
        } = req.body;

        const uids = image.map((item) => item.uid);

        try {
            Addresses.create({
                id: newId1,
                description: description,
                district,
                ward,
                city,
            });

            if (Addresses.findOne({ id: newId1 })) {
                Posts.create({
                    id: newId2,
                    description: postDescription,
                    price: price,
                    title: title,
                    post_address_id: newId1,
                    user_id: currentUserId,
                });
            }

            for (const uid of uids) {
                ImgPost.create({
                    id: uid,
                    // imgUrl: `https://your-image-url/${imgUrl}`,
                    // public_id: imgUrl,
                    post_id: newId2,
                });
            }
            res.status(201).json({
                message: "Post and address created successfully",
            });
        } catch (err) {
            console.log("Error inserting data: ", err);
            res.status(500).json({ message: "An error occurred", error: err });
        }
        // return res.json({ message: "ok" });
    },
    getPosts: async (req, res) => {
        console.log("GetUploadPost");
    },
};

module.exports = PostController;
