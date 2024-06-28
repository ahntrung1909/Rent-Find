import "./card.scss";
import { Link } from "react-router-dom";

function Card({ item }) {
    return (
        <div className="card">
            <Link to={`/post/${item.id}`} className="image-container">
                <img src={item.image} alt="" />
            </Link>

            <div className="text-container">
                <h2 className="title">
                    <Link to={`/${item.id}`}>{item.title}</Link>
                </h2>
                <p className="address">
                    <img src="/pin.png" alt="" />
                    <span>{item.address}</span>
                </p>
                <p className="price">{item.price}tr /tháng</p>
                <div className="bottom">
                    <div className="user">
                        <p>Nguyen Anh Trung</p>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src="/heart.png" alt="" />
                            <p>Thích bài viết</p>
                        </div>
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
