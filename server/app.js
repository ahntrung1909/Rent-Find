const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");
require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const addressesRouter = require("./routes/addresses");
const imgPostRouter = require("./routes/imgPost");

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's domain
        credentials: true, // Allow credentials (cookies) to be sent
    })
);

// Increase the limit to 10MB
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dzmyvhntg",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
    secure: true, // Set to true if your site requires SSL ?
});

// Passport middleware
app.use(passport.initialize());
require("./passport")(passport);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/addresses", addressesRouter);
app.use("/api/img-post", imgPostRouter);

app.use("/api/public/vapi", async (req, res) => {
    const path = req.path;
    const response = await fetch(`https://vapi.vnappmob.com/api${path}`);
    const data = await response.json();
    res.json(data);
});
app.use("/", indexRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
