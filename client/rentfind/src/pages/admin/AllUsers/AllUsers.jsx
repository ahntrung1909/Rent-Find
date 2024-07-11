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
        return {
            key: item.id,
            id: item.id,
            dateOfBirth: item.dob,
            email: item.email,
            fullName: item.full_name,
            password: item.password,
            status: item.status.toString(),
        };
    });

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Ngày sinh",
            dataIndex: "dateOfBirth",
            key: "dateOfBirth",
        },
        {
            title: "Họ và Tên",
            dataIndex: "fullName",
            key: "fullName",
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
        {
            title: "Tùy chọn",
            key: "action",
            render: () => (
                <>
                    <Button type="primary">Sửa thông tin</Button>
                    {/* <Button type="secondary">Xem bài viết</Button> */}
                </>
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
                    Tất cả người dùng
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
