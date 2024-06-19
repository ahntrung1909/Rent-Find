import React from "react";
import { Space, ConfigProvider } from "antd";
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
                    const request = await fetch(
                        "http://localhost:3000/api/auth/sign-up",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(value),
                        }
                    );

                    console.log("value", value);
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
                        placeholder={"Nhập ngày tháng năm sinh:"}
                        fieldProps={{
                            size: "large",
                        }}
                        style={{
                            width: 1000,
                            display: "flex",
                        }}
                    />
                </ConfigProvider>

                {/* <ProFormDatePicker style={{
          width: 328,
        }} 
        placeholder={"Nhập ngày tháng năm sinh:"} name="date" />  */}

                <div
                    style={{
                        marginBlockEnd: 24,
                        marginBottom: 35,
                    }}
                ></div>
            </LoginForm>
        </>
    );
}
