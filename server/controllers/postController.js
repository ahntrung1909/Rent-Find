const { where } = require("sequelize");
const model = require("../models/index");
const { v4 } = require("uuid");
const Posts = model.Posts;
const Addresses = model.Addresses;
import { getDecodedToken } from "../utils/auth";

const PostController = {
    uploadPost: (req, res) => {
        const newId1 = v4();
        const newId2 = v4();
        // const decoded = getDecodedToken().id;
        // const currentUserId = decoded.id;
        const {
            city,
            description,
            district,
            postDescription,
            price,
            title,
            ward,
        } = req.body;

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
                    // user_id: currentUserId,
                });
            }
            res.status(201).json({
                message: "Post and address created successfully",
            });
        } catch (err) {
            console.log("Error inserting data: ", err);
            res.status(500).json({ message: "An error occurred", error: err });
        }
    },
    getPosts: async (req, res) => {
        console.log("GetUploadPost");
    },
};

module.exports = PostController;
