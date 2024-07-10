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
                    status: "false",
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
            const posts = await Posts.findAndCountAll();
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
};

module.exports = AdminController;
