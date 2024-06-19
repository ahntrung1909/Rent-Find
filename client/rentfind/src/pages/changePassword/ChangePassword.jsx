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

export default function ChangePassword() {
    return (
        <>
            <LoginForm
                title="Đổi mật khẩu"
                subTitle="Đổi mật khẩu nếu bạn quên hoặc bị mất!"
                submitter={{ searchConfig: { submitText: "Đổi mật khẩu" } }}
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
                    label={"Nhập email của bạn:"}
                />

                <ProFormText.Password
                    name="oldPassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập mật khẩu"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                    ]}
                    label={"Nhập mật khẩu cũ của bạn:"}
                />

                <ProFormText.Password
                    name="newPassword"
                    fieldProps={{
                        size: "large",
                        prefix: <LockOutlined className={"prefixIcon"} />,
                    }}
                    placeholder={"Nhập mật khẩu"}
                    rules={[
                        {
                            required: true,
                            message: "Không được bỏ trống!",
                        },
                    ]}
                    label={"Nhập mật khẩu mới của bạn:"}
                />
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
