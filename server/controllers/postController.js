const model = require("../models/index");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const removeAccents = require("../utils/removeAccents");
const cloudinary = require("cloudinary").v2;
const Posts = model.Posts;
const PostLikedBy = model.PostLikedBy;
const Addresses = model.Addresses;
const ImgPost = model.ImgPost;
const User = model.User;
const Sequelize = require("sequelize");

const paginate = (page = 1, limit = 2) => {
    const offset = (page - 1) * limit;
    return {
        limit: parseInt(limit),
        offset: parseInt(offset),
        page: parseInt(page),
    };
};

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
                    status: "true", //về sau làm duyệt thì sẽ là false
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
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );
            const { count, rows: allPosts } = await Posts.findAndCountAll({
                where: { status: "true" },
                limit,
                offset,
            });
            res.status(200).json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: allPosts,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }

        // try {
        //     const { page = 1, limit = 2 } = req.query; // lấy giá trị trang hiện tại và giới hạn bài viết mỗi trang từ query params
        //     const offset = (page - 1) * limit;

        //     const { count, rows: allPosts } = await Posts.findAndCountAll({
        //         where: { status: "true" },
        //         limit: parseInt(limit),
        //         offset: parseInt(offset),
        //     });

        //     return res.json({
        //         totalPosts: count,
        //         totalPages: Math.ceil(count / limit),
        //         currentPage: parseInt(page),
        //         posts: allPosts,
        //     });
        // } catch (error) {
        //     res.status(500).json({ errors: error.message });
        // }
    },
    getRentPosts: async (req, res) => {
        try {
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );

            const { count, rows: rentPosts } = await Posts.findAndCountAll({
                where: { status: "true", type: "rent" },
                limit,
                offset,
            });

            return res.json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: rentPosts,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getLeasePosts: async (req, res) => {
        try {
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );

            const { count, rows: leasePosts } = await Posts.findAndCountAll({
                where: { status: "true", type: "lease" },
                limit,
                offset,
            });

            return res.json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: leasePosts,
            });
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
            const userId = req.params.id;
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );

            const { count, rows: myPosts } = await Posts.findAndCountAll({
                where: { user_id: userId, status: "true" },
                limit,
                offset,
            });

            return res.json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: myPosts,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    getMyHidPosts: async (req, res) => {
        try {
            const userId = req.params.id;
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );

            const { count, rows: hiddenPosts } = await Posts.findAndCountAll({
                where: { user_id: userId, status: "hidden" },
                limit,
                offset,
            });

            return res.json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: hiddenPosts,
            });
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
            const { title, price, city, district, ward, page, limit } =
                req.body;
            const postConditions = {};
            // Tính toán offset cho phân trang
            const { offset } = paginate(page, limit);

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
            const { rows: searchPosts, count: totalPosts } =
                await Posts.findAndCountAll({
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
                            attributes: ["id", "img_url"],
                        },
                    ],
                    limit,
                    offset,
                });

            // Tính toán tổng số trang
            const totalPages = Math.ceil(totalPosts / limit);

            console.log("searchPosts: " + searchPosts);

            res.status(200).json({
                posts: searchPosts,
                totalPosts,
                totalPages,
                currentPage: page,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    likePost: async (req, res) => {
        const { postId, userId } = req.body;
        const newId = v4();
        try {
            const result = await PostLikedBy.create({
                id: newId,
                post_id: postId,
                user_id: userId,
            });
            res.status(200).json({ message: "Like thành công!" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },

    unlikePost: async (req, res) => {
        const { postId, userId } = req.body;
        const newId = v4();
        try {
            const result = await PostLikedBy.destroy({
                where: { user_id: userId, post_id: postId },
            });
            res.status(200).json({ message: "Like thành công!" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    checkLike: async (req, res) => {
        const { postId, userId } = req.body;
        try {
            const like = await PostLikedBy.findOne({
                where: { post_id: postId, user_id: userId },
            });
            res.status(200).json({ liked: !!like });
        } catch (error) {
            res.status(500).json({ error: "Failed to check like status" });
        }
    },
    getMyLikedPosts: async (req, res) => {
        try {
            const userId = req.params.id;
            const { page, limit, offset } = paginate(
                req.query.page,
                req.query.limit
            );

            const { count, rows: likedPosts } =
                await PostLikedBy.findAndCountAll({
                    where: { user_id: userId },
                    include: [
                        {
                            model: Posts,
                            where: { status: "true" },
                            include: [
                                {
                                    model: User,
                                    attributes: [
                                        "id",
                                        "full_name",
                                        "phone_number",
                                    ], // Chọn các thuộc tính bạn cần từ User
                                },
                                {
                                    model: ImgPost,
                                    attributes: ["id", "img_url"],
                                },
                            ],
                        },
                    ],
                    limit,
                    offset,
                });

            return res.json({
                totalPosts: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                posts: likedPosts,
            });
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
