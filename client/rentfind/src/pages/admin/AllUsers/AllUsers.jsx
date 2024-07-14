import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
} from "@ant-design/pro-components";
import { Table, Button, message } from "antd";
import AdminList from "../../../components/AdminList/AdminList";
import "./allUsers.scss";

export default function AllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [typePage, setTypePage] = useState("ALL_USERS");

    const getAllUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-users"
            );
            console.log(response.data);
            setAllUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const dataSource = allUsers.data?.map((item) => {
        const statusText =
            {
                warn: "Cảnh cáo",
                banned: "Cấm",
                true: "OK",
            }[item.status] || "";

        return {
            key: item.id,
            id: item.id,
            dateOfBirth: item.dob,
            email: item.email,
            fullName: item.full_name,
            password: item.password,
            status: statusText,
        };
    });

    const columns = [
        {
            title: "Id người dùng",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ và Tên",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Trạng thái tài khoản",
            dataIndex: "status",
            key: "status",
        },
        // {
        //     title: "Tùy chọn",
        //     key: "action",
        //     render: () => (
        //         <>
        //             <Button type="primary">Sửa thông tin</Button>
        //             {/* <Button type="secondary">Xem bài viết</Button> */}
        //         </>
        //     ),
        // },
    ];

    return (
        <>
            <div className="container">
                <h3
                    style={{
                        textAlign: "center",
                    }}
                >
                    Quản lý người dùng
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
                                `http://localhost:3000/api/admin/search-user-by-fullName/${full_name}`
                            )
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log(res.data);
                                    setAllUsers(res.data);
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
                            "http://localhost:5173/all-users";
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
                    {allUsers.count === 0 ? (
                        <p>Không có người dùng</p>
                    ) : (
                        <AdminList dataSource={dataSource} columns={columns} />
                    )}
                </div>
            </div>
        </>
    );
}
