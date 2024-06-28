import "./header.scss";
import { Button, Flex, message } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import { logout } from "../../utils/auth";

export default function Header() {
    const [user, setUser] = useRecoilState(userState);

    return (
        <header>
            <div className="wrapper">
                <Flex justify="space-between" align="center">
                    <Link to="/" className="header-logo">
                        <h3>RentFind</h3>
                    </Link>
                    <Flex align="center" gap="30px">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/upload-post">Đăng bài</Link>
                        <Link to="/search">Tìm kiếm</Link>
                        {user ? (
                            <Flex align="center" gap="30px">
                                <Link to="/profile">
                                    Xin chào, {user.data.full_name}
                                </Link>
                                <Button
                                    size="large"
                                    href="/"
                                    onClick={async () => {
                                        logout();
                                        setTimeout(() => {
                                            window.location.href =
                                                "http://localhost:5173/login";
                                        }, 1500);
                                    }}
                                >
                                    Đăng xuất
                                </Button>
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
