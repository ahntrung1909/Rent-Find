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
            const reports = await Report.findAndCountAll();
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
