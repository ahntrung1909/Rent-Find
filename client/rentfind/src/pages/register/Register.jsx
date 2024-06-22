import React from "react";
import { ConfigProvider, Button, message, Space } from "antd";
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
    ProFormDatePicker,
    viVNIntl,
} from "@ant-design/pro-components";
import {
    UserOutlined,
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
} from "@ant-design/icons";
import { regex } from "../../utils/regex";
import "moment/locale/vi";
import "./register.scss";
import axios from "axios";

const iconStyles = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

function onChange(date, dateString) {
    console.log(date, dateString);
}

export default function Register() {
    return (
        <>
            <LoginForm
                title="Đăng ký"
                subTitle="Đăng ký để sử dụng Rent Find!"
                submitter={{ searchConfig: { submitText: "Đăng ký" } }}
                onFinish={async (value) => {
                    axios
                        .post("http://localhost:3000/api/auth/sign-up", value)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success("Tạo tài khoản thành công !");
                                setTimeout(() => {
                                    window.location.href =
                                        "http://localhost:5173/login";
                                }, 1500);
                            }
                        })
                        .catch((err) => {
                            message.error("Tạo tài khoản thất bại !");
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
                            message: "Không được bỏ trống !",
                        },
                        {
                            pattern: regex.email.params,
                            message: regex.email.error,
                        },
                    ]}
                    label={"Nhập email: "}
                />

                <ProFormText
                    name="fullName"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập tên người dùng:"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống !",
                        },
                    ]}
                    label={"Nhập tên người dùng: "}
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
                            message: "Không được bỏ trống !",
                        },
                    ]}
                    label={"Nhập mật khẩu:"}
                />
                <ProFormText.Password
                    name="rePassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập lại mật khẩu của bạn"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống !",
                        },
                    ]}
                    label={"Nhập lại mật khẩu của bạn"}
                />

                <ProFormText
                    name="phoneNumber"
                    fieldProps={{
                        size: "large",
                        prefix: <UserOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập số điện thoại:"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống !",
                        },
                    ]}
                    label={"Nhập số điện thoại: "}
                />

                <ConfigProvider locale={viVNIntl}>
                    <ProFormDatePicker
                        name="dob"
                        label="Nhập ngày tháng năm sinh:"
                        placeholder={"Date of Birth"}
                        fieldProps={{
                            size: "large",
                        }}
                        style={{
                            width: 1000,
                            display: "flex",
                        }}
                    />
                </ConfigProvider>

                <div
                    style={{
                        marginBlockEnd: 24,
                        marginBottom: 35,
                    }}
                ></div>
                <div
                    style={{
                        marginBlockEnd: 24,
                        textAlign: "right",
                    }}
                >
                    <a href="/login">Đăng nhập ?</a>
                </div>
            </LoginForm>
        </>
    );
}
