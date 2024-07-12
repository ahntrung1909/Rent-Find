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
const Report = model.Report;
const Sequelize = require("sequelize");

const AdminController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAndCountAll({
                where: {
                    role: "user",
                },
            });
            res.status(200).json({
                message: "Successfully fetched all users",
                data: users.rows,
                count: users.count,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                message: "An error occurred while fetching users",
                error: error.message,
            });
        }
    },
    getAllViolatedUsers: async (req, res) => {
        try {
            const users = await User.findAndCountAll({
                where: {
                    role: "user",
                    status: "false", // có thể là ban hoặc warning?
                },
            });
            res.status(200).json({
                message: "Successfully fetched all violated users",
                data: users.rows,
                count: users.count,
            });
        } catch (error) {
            console.error("Error fetching violated users:", error);
            res.status(500).json({
                message: "An error occurred while fetching violated users",
                error: error.message,
            });
        }
    },
    getAllReports: async (req, res) => {
        try {
            const reports = await Report.findAndCountAll({
                include: [
                    {
                        model: User,
                        as: "AccuserUser",
                    },
                    {
                        model: User,
                        as: "AccusedUser",
                    },
                ],
            });
            res.status(200).json({
                message: "Successfully fetched all reports",
                data: reports.rows,
                count: reports.count,
            });
        } catch (error) {
            console.error("Error fetching reports:", error);
            res.status(500).json({
                message: "An error occurred while fetching reports",
                error: error.message,
            });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Posts.findAndCountAll({
                where: {
                    status: "true",
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "full_name", "phone_number"],
                    },
                    {
                        model: Addresses,
                        attributes: ["id"],
                    },
                ],
            });
            res.status(200).json({
                message: "Successfully fetched all posts",
                data: posts.rows,
                count: posts.count,
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({
                message: "An error occurred while fetching posts",
                error: error.message,
            });
        }
    },
    getAllPendingPosts: async (req, res) => {
        try {
            const posts = await Posts.findAndCountAll({
                where: {
                    status: "false",
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "full_name", "phone_number"],
                    },
                ],
            });
            res.status(200).json({
                message: "Successfully fetched all posts",
                data: posts.rows,
                count: posts.count,
            });
        } catch (error) {
            console.error("Error fetching posts:", error);
            res.status(500).json({
                message: "An error occurred while fetching posts",
                error: error.message,
            });
        }
    },
    deletePosts: async (req, res, next) => {
        //không có bản ghi trong postLikedBy và Report thì mới xóa được?
        try {
            const idPost = req.params.id;
            const postAddressId = req.body.post_address_id;
            const imgPosts = req.body.imgPosts;
            const publicIds = imgPosts.map((item) => item.public_id);

            if (publicIds) {
                //chưa xóa được
                for (const publicId of publicIds) {
                    cloudinary.uploader.destroy(publicId, (error, result) => {
                        if (error) {
                            console.error("Xóa ảnh thất bại:", error);
                        } else {
                            console.log("Xóa ảnh thành công:", result);
                        }
                    });
                }
            }

            await ImgPost.destroy({
                where: {
                    post_id: idPost,
                },
            });

            await Posts.destroy({
                where: {
                    id: idPost,
                },
            });

            await Addresses.destroy({
                where: {
                    id: postAddressId,
                },
            });
            res.status(200).json({
                message: "Successfully delete post",
            });
        } catch (error) {
            console.log("Error deleting posts:", error);
            res.status(500).json({
                error: error.message,
            });
        }
    },
    reportSuccess: async (req, res) => {
        try {
            const idReport = req.params.id;
            const { accusedId, status, result } = req.body;
            let action;
            const currentAdminFullName = req.user.dataValues.full_name;
            const count = await Report.count({
                where: {
                    accused: accusedId,
                },
            });

            if (count >= 3) {
                action = "banned";
            } else {
                action = "warn";
            }
            //gửi mail cho người bị tố cáo
            //theo count, nếu count > 3 thì ban, count < 3 thì warn
            await Report.update(
                {
                    action,
                    status,
                    result,
                    verifier: currentAdminFullName,
                    verify_at: Date.now(),
                },
                {
                    where: {
                        id: idReport,
                    },
                }
            );
            return res.status(200).json({ message: "Chỉnh sửa thành công !" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    reportUnsuccess: async (req, res) => {
        try {
            const idReport = req.params.id;
            const { status, result } = req.body;
            const currentAdminFullName = req.user.dataValues.full_name;

            //gửi mail cho người tố cáo => tố cáo không thành công
            await Report.update(
                {
                    action: false,
                    status,
                    result,
                    verifier: currentAdminFullName,
                    verify_at: Date.now(),
                },
                {
                    where: {
                        id: idReport,
                    },
                }
            );
            return res.status(200).json({ message: "Chỉnh sửa thành công !" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    searchPostsByFullName: async (req, res) => {
        try {
            const fullName = req.params.slug;
            const userConditions = {};

            if (fullName) {
                userConditions.full_name =
                    (Sequelize.fn("unaccent", Sequelize.col("full_name")),
                    {
                        [Sequelize.Op.iLike]: `%${fullName}%`,
                    });
            }

            const user = await User.findOne({
                where: userConditions,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Người dùng không tồn tại." });
            }

            const posts = await Posts.findAll({
                where: {
                    user_id: user.id,
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "full_name", "phone_number"],
                    },
                    {
                        model: Addresses,
                        attributes: ["id"],
                    },
                ],
            });

            return res.status(200).json(posts);
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    searchUserByFullName: async (req, res) => {
        try {
            const fullName = req.params.slug;
            const userConditions = {};

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
    searchPendingPostByFullName: async (req, res) => {
        try {
            const fullName = req.params.slug;
            const userConditions = {};

            if (fullName) {
                userConditions.full_name =
                    (Sequelize.fn("unaccent", Sequelize.col("full_name")),
                    {
                        [Sequelize.Op.iLike]: `%${fullName}%`,
                    });
            }

            const user = await User.findOne({
                where: userConditions,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Người dùng không tồn tại." });
            }

            const posts = await Posts.findAndCountAll({
                where: {
                    user_id: user.id,
                    status: "false",
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "full_name", "phone_number"],
                    },
                    {
                        model: Addresses,
                        attributes: ["id"],
                    },
                ],
            });

            return res.status(200).json({
                message: "Successfully fetched all posts",
                data: posts.rows,
                count: posts.count,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    searchAccusedByFullName: async (req, res) => {
        try {
            const fullName = req.params.slug;
            const userConditions = {};

            if (fullName) {
                userConditions.full_name =
                    (Sequelize.fn("unaccent", Sequelize.col("full_name")),
                    {
                        [Sequelize.Op.iLike]: `%${fullName}%`,
                    });
            }

            const user = await User.findOne({
                where: userConditions,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Người dùng không tồn tại." });
            }

            const reports = await Report.findAndCountAll({
                where: {
                    accused: user.id,
                },
                include: [
                    {
                        model: User,
                        as: "AccuserUser",
                    },
                    {
                        model: User,
                        as: "AccusedUser",
                    },
                ],
            });

            return res.status(200).json({
                message: "Successfully fetched all posts",
                data: reports.rows,
                count: reports.count,
            });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
};

module.exports = AdminController;

// const ImgUrls = req.body.img_url;

//             if (!!ImgUrls) {
//                 for (const imgUrl of ImgUrls) {
//                     cloudinary.uploader.destroy(imgUrl, (error, result) => {
//                         if (error) {
//                             console.error("Xóa ảnh thất bại:", error);
//                         } else {
//                             console.log("Xóa ảnh thành công:", result);
//                         }
//                     });

//                     await ImgPost.destroy({
//                         where: {
//                             post_id: idPost,
//                         },
//                     });
//                 }
//             }
