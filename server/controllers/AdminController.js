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
const createTransport = require("../utils/createTransport");

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
            const transport = await createTransport();
            let action, mailOptions;
            const currentAdminFullName = req.user.dataValues.full_name;
            const count = await Report.count({
                where: {
                    accused: accusedId,
                },
            });

            const user = await User.findOne({
                where: {
                    id: accusedId,
                },
            });
            const post = await Posts.findOne({
                where: {
                    user_id: accusedId,
                },
            });

            if (count >= 3) {
                action = "banned";
                User.update(
                    { status: "banned" },
                    {
                        where: {
                            id: accusedId,
                        },
                    }
                );
                mailOptions = {
                    to: user.email,
                    subject: "Thư Cấm tài khoản đến từ Rent Find",
                    html: `
                        <h2>Xin chào người dùng ${user.email}</h2> 
                        <h2>Thư Cấm tài khoản</h2>
                        <p>Do bạn đã bị vi phạm lần thứ 3, sau khi chúng tôi đã cảnh cáo bạn</p>
                        <p>Chúng tôi quyết định cấm tài khoản của bạn trên website Rent Find</p>
                        <p>Nếu có thắc mắc, phản hồi, xin hãy liên hệ vào sdt 024.265.1420</p>
                        <p>Thân ái,</p>
                        <p>Đội ngũ Kiểm Duyệt Rend Find</p>
                    `,
                };
            } else {
                action = "warn";
                User.update(
                    { status: "warn" },
                    {
                        where: {
                            id: accusedId,
                        },
                    }
                );
                mailOptions = {
                    to: user.email,
                    subject: "Thư Cảnh cáo đến từ Rent Find",
                    html: `
                        <h2>Xin chào người dùng ${user.email}</h2> 
                        <h2>Thư Cảnh cáo</h2>
                        <p>Chúng tôi nhận thấy bài viết có tên <h4>"${post.title}"</h4> đã vi phạm tiêu chuẩn cộng đồng của chúng tôi</p>
                        <p>Chúng tôi gửi thư này để cảnh cáo đến bạn, mong rằng bạn sẽ tuân thủ tiêu chuẩn cộng đồng để tạo nên 1 môi trường trong sạch</p>
                        <p>Nếu có thắc mắc, phản hồi, xin hãy liên hệ vào sdt 024.265.1420</p>
                        <p>Thân ái,</p>
                        <p>Đội ngũ Kiểm Duyệt Rend Find</p>
                    `,
                };
            }

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
            await transport.sendMail(mailOptions);
            return res.status(200).json({ message: "Chỉnh sửa thành công !" });
        } catch (error) {
            res.status(500).json({ errors: error.message });
        }
    },
    reportUnsuccess: async (req, res) => {
        try {
            const idReport = req.params.id;
            const { status, result, accuserId, accusedId } = req.body;
            const currentAdminFullName = req.user.dataValues.full_name;
            const transport = await createTransport();

            const user = await User.findOne({
                where: {
                    id: accuserId,
                },
            });
            const post = await Posts.findOne({
                where: {
                    user_id: accusedId,
                },
            });

            const mailOptions = {
                to: user.email,
                subject: "Trạng thái của đơn tố cáo",
                html: `
                    <h2>Xin chào người dùng ${user.email}</h2> 
                    <p>Chúng tôi gửi mail để thông báo rằng bài viết có tên <h4>"${post.title}"</h4> mà bạn đã tố cáo không được chúng tôi thông qua</p>
                    <p>Chúng tôi nhận thấy bài viết này không có lỗi vi phạm như bạn đã gửi về cho chúng tôi</p>
                    <p>Cảm ơn bạn vì ý kiến đóng góp</p>
                    <p>Nếu có thắc mắc, phản hồi, xin hãy liên hệ vào sdt 024.265.1420</p>
                    <p>Thân ái,</p>
                    <p>Đội ngũ Kiểm Duyệt Rend Find</p>
                `,
            };
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
            await transport.sendMail(mailOptions);

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
