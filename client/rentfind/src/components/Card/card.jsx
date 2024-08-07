import "./card.scss";
import React, { useState } from "react";
import { listData } from "../../lib/dummydata.js";
import { Link } from "react-router-dom";
import FormModal from "../ReportModal/Modal.jsx";

function Card(props) {
    const { item, type, handleShowPost, handleHiddenPost } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);

    //fake ảnh
    const imgListData = listData.map((item) => {
        return item.image;
        // console.log(imgListData);
    });
    const postId = item.id;

    const [liked, setLiked] = useState(false);
    const handleLiked = async () => {
        setLiked((prev) => !prev);
    };

    return (
        <div className={type === "RENT" ? "card rent" : "card"}>
            <FormModal
                item={item}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
            />
            <Link to={`/post/${item.id}`} className="image-container">
                <img
                    src={
                        item.ImgPosts[0]?.img_url
                            ? item.ImgPosts[0]?.img_url
                            : "/grey-img-3.svg"
                    }
                    alt=""
                />
            </Link>

            <div className="text-container">
                <h2 className="title">
                    <Link to={`/post/${item.id}`}>{item.title}</Link>
                    {type === "MY_POST" && (
                        <div
                            onClick={() => handleHiddenPost(item.id)}
                            className="icon"
                        >
                            <p>Ẩn</p>
                        </div>
                    )}
                    {(type === "HOME_PAGE" ||
                        type === "RENT" ||
                        type === "LIKED_PAGE" ||
                        type === "LEASE") && (
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="icon"
                        >
                            <img src="/flag.png" alt="" />
                        </div>
                    )}
                    {type === "HIDDEN_POST" && (
                        <div
                            onClick={() => handleShowPost(item.id)}
                            className="icon"
                        >
                            <p>Hiện</p>
                        </div>
                    )}
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="" />
                    <span>
                        {item.Address.description ? (
                            <span>{item.Address.description},</span>
                        ) : (
                            <></>
                        )}{" "}
                        {item.Address.ward}, {item.Address.district},<br></br>{" "}
                        {item.Address.city}
                    </span>
                </p>
                {item.price ? (
                    <p className="price">{item?.price} vnd/tháng</p>
                ) : (
                    <></>
                )}
                <div className="bottom">
                    <div className="user">
                        <Link to={`/user-information/${item.User.id}`}>
                            {item.User.full_name}
                        </Link>
                    </div>
                    <div className="icons">
                        {/* {liked ? (
                            <div
                                onClick={() => handleLiked()}
                                className="icon heart"
                            >
                                <img src="/likedHeart.png" alt="" />
                                <p>Thích bài viết</p>
                            </div>
                        ) : (
                            <div className="icon" onClick={() => handleLiked()}>
                                <img src="/heart.png" alt="" />
                                <p>Thích bài viết</p>
                            </div>
                        )} */}
                        {/* <div className="icon">
                            <img src="/chat.png" alt="" />
                            <p>Nhắn tin</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
