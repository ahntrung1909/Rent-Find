import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { singlePostData, userData } from "../../lib/dummydata.js";
import Slider from "../../components/Slider/slider.jsx";
import "./postDetails.scss";
import axios from "axios";

export default function PostDetails() {
    const [liked, setLiked] = useState(false);
    const [postDetails, setPostDetails] = useState([]);
    const postId = useParams().id;

    const handleLiked = () => {
        setLiked((prev) => !prev);
    };

    useEffect(() => {
        const fetchData = async () => {
            //sửa lại theo cách Trưởng, xử lý ở be
            const response = await axios.get(
                `http://localhost:3000/api/post/get-detail-post/${postId}`
            );
            const data = await response.data;
            console.log(data);

            const postAddressId = data.post_address_id;
            const userAddressId = data.user_id;

            const userResponse = await axios.get(
                `http://localhost:3000/api/user/user-information/${userAddressId}`
            );
            let imgPostResponse;
            try {
                imgPostResponse = await axios.get(
                    `http://localhost:3000/api/img-post/img/${postId.id}`
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

            const postDetailsFull = {
                ...data,
                user: userResponse.data,
                imgPost: imgPostResponse.data,
                address: addressResponse.data,
            };

            setPostDetails(postDetailsFull);
        };

        fetchData();
    }, []);
    console.log(postDetails);
    return (
        <div className="container">
            <div className="single-page">
                <div className="details">
                    <div className="wrapper">
                        <Slider images={singlePostData.images} />
                        <div className="info">
                            <div className="top">
                                <div className="post">
                                    <h1>{postDetails.title}</h1>
                                    <div className="address">
                                        <img src="/pin.png" alt="" />
                                        <span>
                                            {postDetails.address?.description},{" "}
                                            {postDetails.address?.ward},{" "}
                                            {postDetails.address?.district},{" "}
                                            {postDetails.address?.city}
                                        </span>
                                    </div>
                                    <div className="price">
                                        {postDetails.price}tr /tháng
                                    </div>
                                </div>
                            </div>

                            <div className="bottom">
                                {postDetails.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="features">
                    <div className="wrapper">
                        <p className="title">Người đăng bài</p>
                        <div className="list-vertical">
                            {/* <div className="user">
                                <img src={userData.image} alt="" />
                                <span>{userData.name}</span>
                            </div> */}
                            <div className="feature">
                                <img src={userData.image} alt="" />
                                <span>{postDetails.user?.full_name}</span>
                            </div>
                            <div className="feature">
                                <img src="/utility.png" alt="" />
                                <div className="feature-text">
                                    <span>Tiện lợi</span>
                                    <p>Người thuê chịu trách nhiệm</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="/pet.png" alt="" />
                                <div className="feature-text">
                                    <span>Thú cưng</span>
                                    <p>Được phép</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="/fee.png" alt="" />
                                <div className="feature-text">
                                    <span>Phí thuê</span>
                                    <p>
                                        Hơn 3 lần với khoản thu nhập bình quân
                                    </p>
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
                                    onClick={() => handleLiked()}
                                    className="icon heart"
                                >
                                    <button>
                                        <img src="/likedHeart.png" alt="" />
                                        Thích bài viết
                                    </button>
                                </div>
                            ) : (
                                <div
                                    className="icon"
                                    onClick={() => handleLiked()}
                                >
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
