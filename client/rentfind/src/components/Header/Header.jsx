import "./header.scss";
import { Button, Flex } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";

export default function Header() {
    const [user, setUser] = useRecoilState(userState); //để tạm
    useEffect(() => {
        console.log(user);
    }, []);
    return (
        <header>
            <div className="wrapper">
                <Flex justify="space-between" align="center">
                    <Link to="/" className="header-logo">
                        RentFind
                    </Link>
                    <Flex align="center" gap="30px">
                        <Link to="/">Trang chủ</Link>
                        <Link to="/post">Đăng bài</Link>
                        <Link to="/search">Tìm kiếm</Link>
                        {user ? (
                            <Flex align="center" gap="30px">
                                <Link to="/profile">
                                    Xin chào, {user.data.full_name}
                                </Link>
                                <Button size="large" href="/logout">
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
