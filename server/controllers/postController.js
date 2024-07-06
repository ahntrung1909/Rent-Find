const model = require("../models/index");
const { v4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const Posts = model.Posts;
const Addresses = model.Addresses;
const ImgPost = model.ImgPost;

const PostController = {
    uploadPost: async (req, res) => {
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
            images,
        } = req.body;
        // const thumbUrls = image.map((item) => item.thumbUrl);
        // console.log("thumbUrls: " + thumbUrls);

        try {
            await Addresses.create({
                id: newId1,
                description: description,
                district,
                ward,
                city,
            });

            if (Addresses.findOne({ where: { id: newId1 } })) {
                await Posts.create({
                    id: newId2,
                    description: postDescription,
                    price: price,
                    title: title,
                    post_address_id: newId1,
                    user_id: currentUserId,
                });
            }

            for (const img of images) {
                const result = await cloudinary.uploader.upload(img.thumbUrl, {
                    folder: "rent-find",
                });
                console.log("result: ", result.secure_url);

                await ImgPost.create({
                    id: img.uid,
                    img_url: result.secure_url,
                    public_id: result.public_id,
                    post_id: newId2,
                });
            }
            res.status(200).json({
                message: "Post and address created successfully",
            });
        } catch (err) {
            console.log("Error inserting data: ", err);
            res.status(500).json({ message: "An error occurred", error: err });
        }
        // return res.json({ message: "ok" });
    },
    getPosts: async (req, res) => {
        try {
            const allPosts = await Posts.findAll({ where: { status: "true" } });
            return res.json(allPosts);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getDetailsPost: async (req, res) => {
        try {
            const postId = req.params.id;
            const detailPost = await Posts.findOne({ where: { id: postId } });

            //tìm cả user và address luôn ở đây
            return res.json(detailPost);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getMyPosts: async (req, res) => {
        try {
            const postId = req.params.id;
            const myPost = await Posts.findAll({
                where: { user_id: postId, status: "true" },
            });

            //tìm cả user và address luôn ở đây
            return res.json(myPost);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getMyHidPosts: async (req, res) => {
        try {
            const postId = req.params.id;
            const hiddenPost = await Posts.findAll({
                where: { user_id: postId, status: "false" },
            });

            //tìm cả user và address luôn ở đây
            return res.json(hiddenPost);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const idPost = req.params.id;
            const body = req.body;
            await Posts.update(body, {
                where: {
                    id: idPost,
                },
            });
            return res.status(200).json({ message: "Chỉnh sửa thành công !" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
};

module.exports = PostController;

// for (const uid of uids) {
//     for (const thumbUrl of thumbUrls) {
//         const urlImg = thumbUrl.substring(97, 20);
//         ImgPost.create({
//             id: uid,
//             img_url: urlImg,
//             // public_id: imgUrl,
//             post_id: newId2,
//         });
//     }
// }
