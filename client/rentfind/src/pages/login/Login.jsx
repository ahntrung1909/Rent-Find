import React from "react";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { Link, useNavigate } from "react-router-dom";
import { Space, message } from "antd";
import {
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { regex } from "../../utils/regex";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { jwtDecode } from "jwt-decode";

const iconStyles = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

export default function Login() {
    const navigate = useNavigate();

    return (
        <>
            <LoginForm
                title="Đăng nhập"
                subTitle="Đăng nhập để sử dụng RentFind!"
                actions={
                    <Space>
                        Hoặc đăng nhập với
                        <a href="http://localhost:3000/api/auth/google/">
                            <FacebookOutlined style={iconStyles} />
                        </a>
                        <a href="http://localhost:3000/api/auth/google/">
                            <GoogleOutlined style={iconStyles} />
                        </a>
                    </Space>
                }
                submitter={{ searchConfig: { submitText: "Đăng nhập" } }}
                onFinish={async (value) => {
                    axios
                        .post("http://localhost:3000/api/auth/login", value, {
                            withCredentials: true,
                        })
                        .then((res) => {
                            if (res.status === 200) {
                                const { success, accessToken } = res.data;
                                localStorage.setItem(
                                    "accessToken",
                                    accessToken
                                );
                                setAuthToken(accessToken);
                                const { role } = jwtDecode(accessToken);
                                console.log(role);
                                console.log(success);
                                if (success) {
                                    message.success("Đăng nhập thành công!");
                                    if (role === "admin") {
                                        setTimeout(() => {
                                            window.location.href =
                                                "http://localhost:5173/admin";
                                        }, 1000);
                                    } else {
                                        setTimeout(() => {
                                            window.location.href =
                                                "http://localhost:5173/";
                                        }, 1000);
                                    }
                                }
                            }
                        })
                        .catch((err) => {
                            message.error("Đăng nhập thất bại!");
                        });
                }}
            >
                <ProFormText
                    name="email"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập email:"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                        {
                            pattern: regex.email.params,
                            message: regex.email.error,
                        },
                    ]}
                    label={"Nhập email:"}
                />
                <ProFormText.Password
                    name="password"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập mật khẩu của bạn"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                    ]}
                    label={"Nhập mật khẩu:"}
                />
                <div
                    style={{
                        marginBlockEnd: 24,
                        justifyContent: "space-between",
                        display: "flex",
                    }}
                >
                    <a href="/register">Đăng ký ?</a>
                    <a href="/reset-password">Quên mật khẩu ?</a>
                </div>
            </LoginForm>
        </>
    );
}
