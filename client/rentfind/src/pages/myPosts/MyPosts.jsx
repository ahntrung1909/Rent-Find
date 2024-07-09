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
                status: "hidden",
            }
        );
        if (res.status === 200) {
            message.success("Ẩn bài viết thành công");
        }
        fetchData();
    };
    const fetchData = async (page = 1, limit = 5) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/post/get-my-posts/${params.id}`,
                {
                    params: {
                        page,
                        limit,
                    },
                }
            );

            const { posts, totalPosts, totalPages, currentPage } =
                response.data;

            const detailedPostsPromises = posts.map(async (myPosts) => {
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
                    ImgPosts: imgPostResponse.data,
                };
            });

            const detailedPosts = await Promise.all(detailedPostsPromises);
            console.log(detailedPosts);
            setMyPosts({
                posts: detailedPosts,
                totalPosts,
                totalPages,
                currentPage,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handlePageChange = (page, pageSize) => {
        fetchData(page, pageSize);
    };
    return (
        <div className="container">
            <h1 style={{ marginBottom: "25px" }}>Bài viết của tôi</h1>
            <div className="list">
                {myPosts.posts && myPosts.posts.length > 0 ? (
                    <List
                        fetchData={fetchData}
                        listPost={myPosts}
                        type={typePost}
                        handleHiddenPost={handleHiddenPost}
                        handlePageChange={handlePageChange}
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
