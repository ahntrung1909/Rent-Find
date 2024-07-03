import "./card.scss";
import React, { useState } from "react";
import { listData } from "../../lib/dummydata.js";
import { Link } from "react-router-dom";

function Card({ item }) {
    //fake ảnh
    const imgListData = listData.map((item) => {
        return item.image;
    });
    // console.log(imgListData);

    const [liked, setLiked] = useState(false);
    const handleLiked = () => {
        setLiked((prev) => !prev);
    };
    return (
        <div className="card">
            <Link to={`/post/${item.id}`} className="image-container">
                {/* <img src={`https://res.cloudinary.com/dzmyvhntg/image/upload/rent-find/whfuq3x5ylyuooescsah`} alt="" /> */}
                <img src={imgListData} alt="" />
            </Link>

            <div className="text-container">
                <h2 className="title">
                    <Link to={`/post/${item.id}`}>{item.title}</Link>
                    <div className="icon">
                        <img src="/flag.png" alt="" />
                    </div>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="" />
                    <span>
                        {item.address.description}, {item.address.ward},{" "}
                        {item.address.district},<br></br> {item.address.city}
                    </span>
                </p>
                <p className="price">{item?.price}tr /tháng</p>
                <div className="bottom">
                    <div className="user">
                        <Link to={`/user-information/${item.user.id}`}>
                            {item.user.full_name}
                        </Link>
                    </div>
                    <div className="icons">
                        {liked ? (
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
                        )}
                        <div className="icon">
                            <img src="/chat.png" alt="" />
                            <p>Nhắn tin</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
