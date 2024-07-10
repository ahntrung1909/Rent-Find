import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { singlePostData, userData } from "../../lib/dummydata.js";
import { message } from "antd";
import Slider from "../../components/Slider/slider.jsx";
import "./postDetails.scss";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom.js";

export default function PostDetails() {
    const [user, setUser] = useRecoilState(userState);
    const [postDetails, setPostDetails] = useState([]);
    const [liked, setLiked] = useState(false);
    const postId = useParams().id;

    const handleLiked = async () => {
        setLiked((prev) => !prev);

        try {
            if (!liked) {
                // Send POST request to create a new like record
                try {
                    await axios.post(
                        "http://localhost:3000/api/post/like-post",
                        {
                            postId,
                            userId: user.data.id,
                        }
                    );
                    message.success("Thêm vào bài viết đã thích.");
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } else {
                // Send DELETE request to remove the like record
                try {
                    await axios.post(
                        "http://localhost:3000/api/post/unlike-post",
                        {
                            postId,
                            userId: user.data.id,
                        }
                    );
                    message.success("Xóa khỏi bài viết đã thích.");
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        } catch (error) {
            console.error("Error updating like status:", error);
        }
    };

    const fetchData = async () => {
        //sửa lại theo cách Trưởng, xử lý ở be
        const response = await axios.get(
            `http://localhost:3000/api/post/get-detail-post/${postId}`
        );
        const data = await response.data;
        // console.log(data);
        const postAddressId = data.post_address_id;
        const userAddressId = data.user_id;

        const userResponse = await axios.get(
            `http://localhost:3000/api/user/user-information/${userAddressId}`
        );

        let imgPostResponse;
        try {
            imgPostResponse = await axios.get(
                `http://localhost:3000/api/img-post/img/${data.id}`
            );
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Image post not found, skipping...");
                imgPostResponse = { data: null };
            } else {
                throw error;
            }
        }

        const addressResponse = await axios.get(
            `http://localhost:3000/api/addresses/address-information/${postAddressId}`
        );

        let imgList = [];
        if (imgPostResponse) {
            imgList = imgPostResponse.data.map((img) => {
                return img.img_url;
            });
        }

        // console.log(imgList);
        const postDetailsFull = {
            ...data,
            User: userResponse.data,
            ImgPost: imgList,
            Address: addressResponse.data,
        };

        setPostDetails(postDetailsFull);

        if (user?.data && user?.data?.id) {
            const likeResponse = await axios.post(
                "http://localhost:3000/api/post/check-like",
                {
                    postId,
                    userId: user.data.id,
                }
            );
            setLiked(likeResponse.data.liked);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    // console.log(postDetails);
    return (
        <div className="container">
            <div className="single-page">
                <div className="details">
                    <div className="wrapper">
                        {/* <Slider images={singlePostData.images} /> */}
                        {postDetails?.ImgPost?.length ? (
                            <Slider images={postDetails.ImgPost} />
                        ) : (
                            <img
                                style={{
                                    height: "250px",
                                    width: "500px",
                                }}
                                src="/grey-img-3.svg"
                                alt=""
                            />
                        )}
                        <div className="info">
                            <div className="top">
                                <div className="post">
                                    <h1>{postDetails.title}</h1>
                                    <div className="address">
                                        <img src="/pin.png" alt="" />
                                        <span>
                                            {postDetails.Address?.description}{" "}
                                            {postDetails.Address?.ward},{" "}
                                            {postDetails.Address?.district},{" "}
                                            {postDetails.Address?.city}
                                        </span>
                                    </div>
                                    {postDetails.price ? (
                                        <div className="price">
                                            {postDetails.price}vnd/tháng
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>

                            <div className="bottom">
                                <pre
                                    style={{
                                        fontFamily: "inherit",
                                        fontSize: "inherit",
                                        fontWeight: "normal",
                                        color: "black",
                                        lineHeight: "30px",
                                    }}
                                >
                                    {postDetails.description}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features">
                    <div className="wrapper">
                        <p className="title">Người đăng bài</p>
                        <div className="list-vertical">
                            <div className="feature">
                                <img src="/user.jpg" alt="" />
                                <Link
                                    to={`/user-information/${postDetails.user_id}`}
                                >
                                    {postDetails.User?.full_name}
                                </Link>
                                {/* <span>{postDetails.User?.full_name}</span> */}
                            </div>
                            <div className="feature">
                                <img src="/phone.jpg" alt="" />
                                <div className="feature-text">
                                    <span>Số điện thoại:</span>
                                    <p>{postDetails.User?.phone_number}</p>
                                </div>
                            </div>
                        </div>

                        <div className="buttons">
                            <button>
                                <img src="/chat.png" alt="" />
                                Gửi tin nhắn
                            </button>
                            {liked ? (
                                <div
                                    onClick={handleLiked}
                                    className="icon heart"
                                >
                                    <button>
                                        <img src="/likedHeart.png" alt="" />
                                        Thích bài viết
                                    </button>
                                </div>
                            ) : (
                                <div className="icon" onClick={handleLiked}>
                                    <button>
                                        <img src="/heart.png" alt="" />
                                        Thích bài viết
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
