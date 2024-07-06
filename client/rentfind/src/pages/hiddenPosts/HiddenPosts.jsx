import "./hiddenPosts.scss";
import React, { useState, useEffect } from "react";
import List from "../../components/List/list";
import { message, notification } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
function HiddenPosts() {
    const [typePost, setTypePost] = useState("HIDDEN_POST");
    const [hiddenPosts, setHiddenPosts] = useState([]);
    const params = useParams();

    const handleShowPost = async (id) => {
        const res = await axios.post(
            `http://localhost:3000/api/post/update-post/${id}`,
            {
                status: true,
            }
        );
        if (res.status === 200) {
            message.success("Hiện bài viết thành công!");
        }
        fetchData();
    };
    const fetchData = async () => {
        //sửa lại theo cách Trưởng, xử lý ở be
        const response = await axios.get(
            `http://localhost:3000/api/post/get-my-hidden-posts/${params.id}`
        );
        const data = await response.data;

        const detailedPostsPromises = data.map(async (hiddenPosts) => {
            const userResponse = await axios.get(
                `http://localhost:3000/api/user/user-information/${hiddenPosts.user_id}`
            );
            const addressResponse = await axios.get(
                `http://localhost:3000/api/addresses/address-information/${hiddenPosts.post_address_id}`
            );

            let imgPostResponse;
            try {
                imgPostResponse = await axios.get(
                    `http://localhost:3000/api/img-post/img/${hiddenPosts.id}`
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
                ...hiddenPosts,
                user: userResponse.data,
                address: addressResponse.data,
                imgPost: imgPostResponse.data,
            };
        });

        const detailedPosts = await Promise.all(detailedPostsPromises);
        setHiddenPosts(detailedPosts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(hiddenPosts);
    return (
        <div className="container">
            <h1 style={{ marginBottom: "25px" }}>Bài viết đã ẩn</h1>
            <div className="list">
                {hiddenPosts.length > 0 ? (
                    <List
                        listPost={hiddenPosts}
                        type={typePost}
                        handleShowPost={handleShowPost}
                    />
                ) : (
                    <p>Bạn đang không ẩn bài viết nào</p>
                )}
            </div>
        </div>
    );
}

export default HiddenPosts;
