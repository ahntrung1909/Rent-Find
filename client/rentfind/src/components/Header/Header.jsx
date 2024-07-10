import "./header.scss";
import { Button, Flex, Dropdown, message, Space } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import { logout } from "../../utils/auth";

export default function Header() {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const onClick = ({ key }) => {
        switch (key) {
            case "1":
                message.info("Hồ sơ người dùng");
                navigate(`/user-information/${user.data.id}`);

                // setTimeout(() => {
                //     window.location.href = `http://localhost:5173/user-information/${user.data.id}`;
                // }, 750);
                break;
            case "2":
                message.info("Đổi mật khẩu người dùng");
                navigate(`/change-password`);

                // setTimeout(() => {
                //     window.location.href =
                //         "http://localhost:5173/change-password";
                // }, 750);
                break;
            case "3":
                message.info("Bài viết của bạn");
                navigate(`/my-posts/${user.data.id}`);

                // setTimeout(() => {
                //     window.location.href = `http://localhost:5173/my-posts/${user.data.id}`;
                // }, 750);
                break;
            case "4":
                message.info("Những bài viết đã thích của bạn");
                navigate(`/liked-posts/${user.data.id}`);

                // setTimeout(() => {
                //     window.location.href = `http://localhost:5173/liked-posts/${user.data.id}`;
                // }, 750);
                break;
            case "5":
                message.info("Những bài viết đã ẩn của bạn");
                navigate(`/my-hidden-posts/${user.data.id}`);

                // setTimeout(() => {
                //     window.location.href = `http://localhost:5173/my-hidden-posts/${user.data.id}`;
                // }, 750);
                break;
            case "6":
                message.success({
                    message: "Đăng xuất thành công",
                });
                logout();
                // navigate(`/login`);

                setTimeout(() => {
                    window.location.href = "http://localhost:5173/login";
                }, 1500);
                break;
            default:
                break;
        }
    };
    const items = [
        {
            label: "Hồ sơ",
            key: "1",
        },
        {
            label: "Đổi mật khẩu",
            key: "2",
        },
        {
            label: "Bài viết của tôi",
            key: "3",
        },
        {
            label: "Bài viết đã thích",
            key: "4",
        },
        {
            label: "Bài viết đã ẩn",
            key: "5",
        },
        {
            label: "Đăng xuất",
            key: "6",
        },
    ];
    return (
        <header>
            <div className="wrapper">
                <Flex justify="space-between" align="center">
                    <Link to="/" className="header-logo">
                        <h3>RentFind</h3>
                    </Link>
                    <Flex align="center" gap="30px">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/rent">Thuê</Link>
                        <Link to="/lease">Cho Thuê</Link>
                        <Link to="/upload-post">Đăng bài</Link>
                        <Link to="/about-us">Về chúng tôi</Link>
                        {user ? (
                            <Flex align="center" gap="30px">
                                <Dropdown
                                    menu={{
                                        items,
                                        onClick,
                                    }}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            {/* Thay thế thẻ <a> bằng <span> */}
                                            <span>
                                                Xin chào, {user.data.full_name}
                                            </span>
                                        </Space>
                                    </a>
                                </Dropdown>
                            </Flex>
                        ) : (
                            <Flex gap="10px">
                                <Button
                                    type="primary"
                                    size="large"
                                    href="/register"
                                >
                                    Đăng ký
                                </Button>
                                <Button size="large" href="/login">
                                    Đăng nhập
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            </div>
        </header>
    );
}
