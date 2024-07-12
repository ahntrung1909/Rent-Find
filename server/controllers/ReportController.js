const model = require("../models/index");
const { v4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const Posts = model.Posts;
const ImgReport = model.ImgReport;
const Report = model.Report;
const User = model.User;

const ReportController = {
    uploadReport: async (req, res) => {
        const newId1 = v4();
        const currentUserId = req.user.dataValues.id;
        const { accuser, accused, post_id, textarea, images } = req.body;
        console.log(req.body);

        try {
            await Report.create({
                id: newId1,
                accuser: accuser,
                accused: accused,
                reason: textarea,
                send_at: new Date(),
                post_id: post_id,
            });

            if (!!images) {
                for (const img of images) {
                    const result = await cloudinary.uploader.upload(
                        img.thumbUrl,
                        {
                            folder: "rent-find-report",
                        }
                    );
                    // console.log("result: ", result.secure_url);

                    await ImgReport.create({
                        id: img.uid,
                        img_url: result.secure_url,
                        public_id: result.public_id,
                        report_id: newId1,
                    });
                }
            }
            res.status(200).json({
                message: "Report created successfully",
            });
        } catch (err) {
            console.log("Error inserting data: ", err);
            res.status(500).json({ message: "An error occurred", error: err });
        }
        // return res.json({ message: "ok" });
    },
};

module.exports = ReportController;
