import React from "react";
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { Space } from "antd";
import {
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { regex } from "../../utils/regex";

const iconStyles = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

export default function Login() {
    return (
        <>
            <LoginForm
                title="Đăng nhập"
                subTitle="Đăng nhập để sử dụng RentFind nhé!"
                actions={
                    <Space>
                        Hoặc đăng nhập với
                        <FacebookOutlined style={iconStyles} />
                        <a href="http://localhost:3000/api/auth/google/">
                            <GoogleOutlined style={iconStyles} />
                        </a>
                    </Space>
                }
                submitter={{ searchConfig: { submitText: "Đăng nhập" } }}
            >
                <ProFormText
                    name="username"
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
                        textAlign: "right",
                    }}
                >
                    <a href="/change-password">Đổi mật khẩu ?</a>
                </div>
            </LoginForm>
        </>
    );
}
