const model = require("../models/index");
const { v4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const Posts = model.Posts;
const ImgReport = model.ImgReport;
const Report = model.Report;

const ReportController = {
    uploadReport: async (req, res) => {
        console.log("reqBOdy" + req.body);
    },
};

module.exports = ReportController;
