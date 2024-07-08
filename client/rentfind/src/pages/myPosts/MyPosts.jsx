import "./myPosts.scss";
import React, { useState, useEffect } from "react";
import { message, notification } from "antd";
import List from "../../components/List/list";
import axios from "axios";
import { useParams } from "react-router-dom";
function MyPosts() {
    //thêm lấy imgPost
    const [myPosts, setMyPosts] = useState([]);
    const [typePost, setTypePost] = useState("MY_POST");
    const params = useParams();

    const handleHiddenPost = async (id) => {
        const res = await axios.post(
            `http://localhost:3000/api/post/update-post/${id}`,
            {
                status: false,
            }
        );
        if (res.status === 200) {
            message.success("Ẩn bài viết thành công");
        }
        fetchData();
    };
    const fetchData = async () => {
        //sửa lại theo cách Trưởng, xử lý ở be
        const response = await axios.get(
            `http://localhost:3000/api/post/get-my-posts/${params.id}`
        );
        const data = await response.data;

        const detailedPostsPromises = data.map(async (myPosts) => {
            const userResponse = await axios.get(
                `http://localhost:3000/api/user/user-information/${myPosts.user_id}`
            );
            const addressResponse = await axios.get(
                `http://localhost:3000/api/addresses/address-information/${myPosts.post_address_id}`
            );

            let imgPostResponse;
            try {
                imgPostResponse = await axios.get(
                    `http://localhost:3000/api/img-post/img/${myPosts.id}`
                );
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("Image post not found, skipping...");
                    imgPostResponse = { data: null };
                } else {
                    throw error;
                }
            }

            return {
                ...myPosts,
                User: userResponse.data,
                Address: addressResponse.data,
                ImgPost: imgPostResponse.data,
            };
        });

        const detailedPosts = await Promise.all(detailedPostsPromises);
        setMyPosts(detailedPosts);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1 style={{ marginBottom: "25px" }}>Bài viết của tôi</h1>
            <div className="list">
                {myPosts.length > 0 ? (
                    <List
                        listPost={myPosts}
                        type={typePost}
                        handleHiddenPost={handleHiddenPost}
                    />
                ) : (
                    <>
                        <p>Bạn chưa đăng bài viết nào</p>
                        <a style={{ color: "blue" }} href="/upload-post">
                            Đăng bài?
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyPosts;
