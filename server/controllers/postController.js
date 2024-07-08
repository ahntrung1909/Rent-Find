const model = require("../models/index");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const removeAccents = require("../utils/removeAccents");
const cloudinary = require("cloudinary").v2;
const Posts = model.Posts;
const Addresses = model.Addresses;
const ImgPost = model.ImgPost;
const User = model.User;
const Sequelize = require("sequelize");

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
            type,
            title,
            ward,
            images,
        } = req.body;
        console.log(req.body);

        try {
            await Addresses.create({
                id: newId1,
                description,
                district,
                ward,
                city,
            });

            if (Addresses.findOne({ where: { id: newId1 } })) {
                await Posts.create({
                    id: newId2,
                    description: postDescription,
                    price,
                    title,
                    type: type,
                    post_address_id: newId1,
                    user_id: currentUserId,
                });
            }

            for (const img of images) {
                const result = await cloudinary.uploader.upload(img.thumbUrl, {
                    folder: "rent-find",
                });
                // console.log("result: ", result.secure_url);

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
    getRentPosts: async (req, res) => {
        try {
            const rentPosts = await Posts.findAll({
                where: { status: "true", type: "rent" },
            });
            return res.json(rentPosts);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getLeasePosts: async (req, res) => {
        try {
            const leasePosts = await Posts.findAll({
                where: { status: "true", type: "lease" },
            });
            return res.json(leasePosts);
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
    //tìm kiếm
    search: async (req, res) => {
        try {
            const { title, price, city, district, ward } = req.body;
            const postConditions = {};

            // Điều kiện tìm kiếm cho bảng Posts
            if (title) {
                postConditions.title =
                    (Sequelize.fn("unaccent", Sequelize.col("title")),
                    {
                        [Sequelize.Op.iLike]: `%${title}%`,
                    });
            }

            if (price) {
                switch (price) {
                    case "under_1_million":
                        postConditions.price = { [Op.lt]: 1000000 };
                        break;
                    case "1_to_2_million":
                        postConditions.price = {
                            [Op.between]: [1000000, 2000000],
                        };
                        break;
                    case "2_to_3_million":
                        postConditions.price = {
                            [Op.between]: [2000000, 3000000],
                        };
                        break;
                    case "3_to_5_million":
                        postConditions.price = {
                            [Op.between]: [3000000, 5000000],
                        };
                        break;
                    case "5_to_7_million":
                        postConditions.price = {
                            [Op.between]: [5000000, 7000000],
                        };
                        break;
                    case "7_to_10_million":
                        postConditions.price = {
                            [Op.between]: [7000000, 10000000],
                        };
                        break;
                }
            }

            // Điều kiện tìm kiếm cho bảng Addresses
            const addressConditions = {};
            if (city) {
                addressConditions.city = city;
            }
            if (district) {
                addressConditions.district = district;
            }
            if (ward) {
                addressConditions.ward = ward;
            }

            // Thực hiện truy vấn với các điều kiện
            // SELECT * FROM posts
            // JOIN addresses ON posts.post_address_id = addresses.id
            // WHERE (posts.description = 'Cho thuê nhà trọ 3')
            //   AND (posts.price BETWEEN 4000000 AND 6000000)
            //   AND (addresses.city = 'Thành phố Hồ Chí Minh')
            //   AND (addresses.district = 'Quận 1')
            //   AND (addresses.ward = 'Phường Nguyễn Thái Bình');
            const searchPosts = await Posts.findAll({
                where: postConditions,
                include: [
                    {
                        model: Addresses,
                        where: addressConditions,
                    },
                    {
                        model: User,
                        attributes: ["id", "full_name", "phone_number"],
                    },
                    {
                        model: ImgPost,
                        attributes: ["id", "public_id"],
                    },
                ],
            });
            console.log("searchPosts: " + searchPosts);
            res.status(200).json(searchPosts);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
};

module.exports = PostController;

// for (const uid of uids)
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
