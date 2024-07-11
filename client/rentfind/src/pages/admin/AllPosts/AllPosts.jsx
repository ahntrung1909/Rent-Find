import React, { useState, useEffect } from "react";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
} from "@ant-design/pro-components";
import axios, { all } from "axios";
import "./allPosts.scss";
import { Table, Button, message } from "antd";
import AdminList from "../../../components/AdminList/AdminList";

export default function AllPosts() {
    const [allPosts, setAllPosts] = useState([]);
    const [typePage, setTypePage] = useState("ALL_POSTS");

    const getallPosts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-posts"
            );
            const posts = response.data;
            // Duyệt qua mỗi bài viết và lấy ImgPosts
            const postsWithImages = await Promise.all(
                posts.data.map(async (post) => {
                    const imgResponse = await axios.get(
                        `http://localhost:3000/api/img-post/img/${post.id}`
                    );
                    return {
                        ...post,
                        ImgPosts: imgResponse.data, // Giả sử imgResponse.data chứa ImgPosts
                    };
                })
            );
            setAllPosts(postsWithImages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getallPosts();
    }, []);

    const deletePost = async (id, postAddressId, imgUrl) => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/admin/delete-post/${id}`,
                { post_address_id: postAddressId, img_url: imgUrl }
            );
            if (res.status === 200) {
                message.success("Xóa bài viết thành công!");
            }
            getallPosts();
        } catch (error) {
            console.error("Error censoring post:", error);
            message.error("Xóa bài viết thất bại!");
        }
    };

    const dataSource = allPosts.map((item) => {
        return {
            key: item.id,
            id: item.id,
            description: item.description,
            price: item.price,
            title: item.title,
            user: item.User?.full_name,
            status: item.status === "false" ? "Chưa duyệt" : "Đã duyệt",
            post_address_id: item.post_address_id,
            img_url: item.ImgPosts.map((item) => item.img_url),
            type: item.type === "rent" ? "Thuê" : "Cho thuê",
        };
    });

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Người đăng bài",
            dataIndex: "user",
            key: "user",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Kiểu đăng bài",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Tùy chọn",
            key: "action",
            render: (_, record) => (
                <Button
                    type="primary"
                    onClick={() =>
                        deletePost(
                            record.id,
                            record.post_address_id,
                            record.img_url
                        )
                    }
                >
                    Xóa bài viết
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="container">
                <h3
                    style={{
                        textAlign: "center",
                    }}
                >
                    Tất cả các bài viết
                </h3>
                <ProForm
                    submitter={{
                        searchConfig: {
                            submitText: "Tìm",
                        },
                        resetButtonProps: false,
                    }}
                    onFinish={async (values) => {
                        console.log(values);
                    }}
                >
                    <ProFormText
                        name="title"
                        label="Từ khóa"
                        placeholder="Nhập từ khóa tìm kiếm"
                        className="custom-width"
                    />
                </ProForm>
                <div className="content">
                    <AdminList dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </>
    );
}
