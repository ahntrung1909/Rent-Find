import "./list.scss";
import React, { useState, useEffect } from "react";
import Card from "../Card/card.jsx";
import axios from "axios";
function List() {
    //thêm lấy imgPost
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            //sửa lại theo cách Trưởng, xử lý ở be
            const response = await axios.get(
                "http://localhost:3000/api/post/get-posts"
            );
            const data = await response.data;

            const detailedPostsPromises = data.map(async (post) => {
                const userResponse = await axios.get(
                    `http://localhost:3000/api/user/user-information/${post.user_id}`
                );
                const addressResponse = await axios.get(
                    `http://localhost:3000/api/addresses/address-information/${post.post_address_id}`
                );
                const imgPostResponse = await axios.get(
                    //sửa lại
                    `http://localhost:3000/api/img-post/img/${post.id}`
                );

                return {
                    ...post,
                    user: userResponse.data,
                    address: addressResponse.data,
                    imgPostResponse: imgPostResponse.data,
                };
            });

            const detailedPosts = await Promise.all(detailedPostsPromises);
            setPosts(detailedPosts);
        };

        fetchData();
    }, []);

    console.log(posts);
    return (
        <div className="list">
            {posts.map((item) => (
                <Card key={item.id} item={item}></Card>
            ))}
        </div>
    );
}

export default List;
