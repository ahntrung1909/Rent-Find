import React, { useState } from "react";
import {
    LoginForm,
    ProFormCheckbox,
    ProFormText,
} from "@ant-design/pro-components";
import { notification } from "antd";
import {
    LockOutlined,
    FacebookOutlined,
    GoogleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { regex } from "../../utils/regex";
import axios from "axios";

const iconStyles = {
    marginInlineStart: "16px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

export default function ResetPassword() {
    const [step, setStep] = useState("getCode");
    return (
        <>
            {step === "getCode" && (
                <LoginForm
                    title="Quên mật khẩu"
                    subTitle="Nhập email để lấy lại mật khẩu!"
                    submitter={{
                        searchConfig: { submitText: "Lấy mã xác thực" },
                    }}
                    onFinish={async (values) => {
                        const res = await axios.post(
                            "http://localhost:3000/api/auth/reset-password/get-code",
                            { email: values.useremail }
                        );
                        console.log("res", res);
                        if (res.status === 200) {
                            notification.success({
                                message: "Đã gửi mã xác nhận về email của bạn!",
                            });
                        } else {
                            notification.error({
                                message: "Gửi mail thất bại",
                            });
                        }
                        setStep("checkCode");
                    }}
                >
                    <ProFormText
                        name="useremail"
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
                </LoginForm>
            )}
            {step === "checkCode" && (
                <LoginForm
                    title="Quên mật khẩu"
                    subTitle="Nhập mã xác thực!"
                    submitter={{
                        searchConfig: {
                            submitText: "Kiểm tra mã xác thực của bạn",
                        },
                    }}
                    onFinish={async (values) => {
                        const res = await axios.post(
                            "http://localhost:3000/api/auth/reset-password/check-code",
                            { code: values.code }
                        );
                        console.log("res", res);
                        if (res.status === 200) {
                            notification.success({
                                message: "Xác nhận thành công!",
                            });
                            setStep("changePassword");
                        } else {
                            notification.error({
                                message: "Xác nhận thất bại!",
                            });
                        }
                    }}
                >
                    <ProFormText
                        name="code"
                        fieldProps={{
                            size: "large",
                            prefix: <UserOutlined className={"prefixIcon"} />,
                        }}
                        placeholder={"Nhập mã xác thực:"}
                        label={"Nhập mã xác thực chúng tôi đã gửi về email:"}
                    />
                </LoginForm>
            )}
            {step === "changePassword" && (
                <LoginForm
                    title="Đổi mật khẩu"
                    subTitle="Thay đổi mật khẩu!"
                    submitter={{
                        searchConfig: {
                            submitText: "Đổi mật khẩu",
                        },
                    }}
                    onFinish={async (values) => {
                        const res = await axios.post(
                            "http://localhost:3000/api/auth/reset-password/change-password",
                            { password: values.password }
                        );
                        console.log("res", res);
                        if (res.status === 200) {
                            notification.success({
                                message: "Đổi mật khẩu thành công",
                            });
                            setTimeout(() => {
                                window.location.href =
                                    "http://localhost:5173/login";
                            }, 1500);
                        } else {
                            notification.error({
                                message: "Đổi mật khẩu thất bại!",
                            });
                        }
                    }}
                >
                    <ProFormText.Password
                        name="password"
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
                                message:
                                    "Mật khẩu mới phải có ít nhất 6 ký tự!",
                            },
                        ]}
                        label={"Nhập mật khẩu mới của bạn:"}
                    />
                    <ProFormText.Password
                        name="rePassword"
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
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("Mật khẩu không trùng khớp!")
                                    );
                                },
                            }),
                        ]}
                        label={"Nhập lại mật khẩu mới của bạn:"}
                    />
                </LoginForm>
            )}
        </>
    );
}
