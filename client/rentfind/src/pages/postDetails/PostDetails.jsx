import React from "react";
import { singlePostData, userData } from "../../lib/dummydata.js";
import Slider from "../../components/Slider/slider.jsx";
import "./postDetails.scss";
export default function PostDetails() {
    return (
        <div className="container">
            <div className="single-page">
                <div className="details">
                    <div className="wrapper">
                        <Slider images={singlePostData.images} />
                        <div className="info">
                            <div className="top">
                                <div className="post">
                                    <h1>{singlePostData.title}</h1>
                                    <div className="address">
                                        <img src="/pin.png" alt="" />
                                        <span>{singlePostData.address}</span>
                                    </div>
                                    <div className="price">
                                        {singlePostData.price}tr /tháng
                                    </div>
                                </div>
                            </div>

                            <div className="bottom">
                                {singlePostData.description}
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
                                <span>{userData.name}</span>
                            </div>
                            <div className="feature">
                                <img src="utility.png" alt="" />
                                <div className="feature-text">
                                    <span>Tiện lợi</span>
                                    <p>Người thuê chịu trách nhiệm</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="pet.png" alt="" />
                                <div className="feature-text">
                                    <span>Thú cưng</span>
                                    <p>Được phép</p>
                                </div>
                            </div>
                            <div className="feature">
                                <img src="fee.png" alt="" />
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
                            <button>
                                <img src="/heart.png" alt="" />
                                Thích bài viết
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
