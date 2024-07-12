import React, { useState, useEffect } from "react";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
} from "@ant-design/pro-components";
import axios from "axios";
import "./onPending.scss";
import { Table, Button, message } from "antd";

import AdminList from "../../../components/AdminList/AdminList";

export default function OnPending() {
    const [pendingPosts, setPendingPosts] = useState([]);
    const [typePage, setTypePage] = useState("ON_PENDING");

    const getPendingPosts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-pending-posts"
            );
            // console.log(response.data);
            setPendingPosts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getPendingPosts();
    }, []);

    const censorPost = async (id) => {
        try {
            const res = await axios.post(
                `http://localhost:3000/api/post/update-post/${id}`,
                { status: true }
            );
            if (res.status === 200) {
                message.success("Duyệt bài viết thành công!");
            }
            getPendingPosts();
            setTimeout(() => {
                window.location.href = "http://localhost:5173/on-pending";
            }, 750);
        } catch (error) {
            console.error("Error censoring post:", error);
            message.error("Duyệt bài viết thất bại!");
        }
    };
    const dataSource = pendingPosts.data?.map((item) => {
        return {
            key: item.id,
            id: item.id,
            description: item.description,
            price: item.price,
            title: item.title,
            user: item.User?.full_name,
            status: item.status === "false" ? "Chưa duyệt" : "",
            type: item.type === "rent" ? "Thuê" : "Cho thuê",
        };
    });

    const columns = [
        {
            title: "Id bài viết",
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
                <Button type="primary" onClick={() => censorPost(record.id)}>
                    Duyệt bài viết
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
                    Các bài viết chưa được duyệt
                </h3>
                <ProForm
                    submitter={{
                        searchConfig: {
                            submitText: "Tìm",
                            resetText: "Quay lại",
                        },
                    }}
                    onFinish={async (values) => {
                        const full_name = values.full_name;
                        if (!full_name) {
                            message.info("Vui lòng nhập từ khóa tìm kiếm!");
                            return;
                        }

                        await axios
                            .get(
                                `http://localhost:3000/api/admin/search-pending-post-by-fullName/${full_name}`
                            )
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log(res.data);
                                    setPendingPosts(res.data);
                                }
                            })
                            .catch((err) => {
                                message.error(
                                    "Từ khóa tìm kiếm không tồn tại!"
                                );
                                console.log(err);
                            });
                    }}
                    onReset={() => {
                        window.location.href =
                            "http://localhost:5173/on-pending";
                    }}
                >
                    <ProFormText
                        name="full_name"
                        label="Tên người dùng"
                        placeholder="Nhập từ khóa tìm kiếm"
                        className="custom-width"
                    />
                </ProForm>
                <div className="content">
                    {pendingPosts.count === 0 ? (
                        <p>Không có bài viết nào cần duyệt</p>
                    ) : (
                        <AdminList dataSource={dataSource} columns={columns} />
                    )}
                </div>
            </div>
        </>
    );
}
