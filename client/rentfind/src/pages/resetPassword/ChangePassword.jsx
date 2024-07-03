import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowRightOutlined, LockOutlined } from "@ant-design/icons";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { ConfigProvider, notification } from "antd";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";

export default function ChangePassword() {
    const [user, setUser] = useRecoilState(userState);
    // console.log(user);
    return (
        <div className="container">
            <div
                className="about"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h1
                    style={{
                        margin: "20px 0",
                    }}
                >
                    Đổi mật khẩu
                </h1>
                <div style={{ marginTop: "25px" }}>
                    <Link to="/">
                        Quay về trang chủ <ArrowRightOutlined />
                    </Link>
                </div>
                {/*tý  chỉnh  */}
            </div>
            <ProForm
                submitter={{
                    searchConfig: {
                        submitText: "Lưu",
                        resetText: "Hủy",
                    },
                }}
                // onFinish={async (values) => {
                //     console.log(values);
                // }}
                onFinish={async (values) => {
                    const res = await axios.post(
                        "http://localhost:3000/api/auth/change-currentUser-password",
                        values
                    );
                    if (res.status === 200) {
                        notification.success({
                            message: "Đổi mật khẩu thành công",
                        });
                        setTimeout(() => {
                            window.location.href =
                                "http://localhost:5173/profile";
                        }, 1500);
                    } else {
                        notification.error({
                            message: "Đổi mật khẩu thất bại!",
                        });
                    }
                }}
                onReset={() => {
                    window.location.href = "http://localhost:5173";
                }}
            >
                <ProFormText.Password
                    name="oldPassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập mật khẩu cũ"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || user.data.password === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu không trùng khớp!")
                                );
                            },
                        }),
                    ]}
                    label={"Nhập mật khẩu cũ của bạn:"}
                />
                <ProFormText.Password
                    name="newPassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập mật khẩu mới"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                        {
                            pattern: /^(?=.*[A-Z]).{6,}$/,
                            message:
                                "Mật khẩu mới phải chứa ít nhất một chữ in hoa!",
                        },
                        {
                            min: 6,
                            message: "Mật khẩu mới phải có ít nhất 6 ký tự!",
                        },
                    ]}
                    label={"Nhập mật khẩu mới của bạn:"}
                />
                <ProFormText.Password
                    name="reNewPassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập lại mật khẩu mới"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue("newPassword") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error("Mật khẩu mới không trùng khớp!")
                                );
                            },
                        }),
                    ]}
                    label={"Nhập lại mật khẩu mới của bạn:"}
                />
            </ProForm>
        </div>
    );
}
