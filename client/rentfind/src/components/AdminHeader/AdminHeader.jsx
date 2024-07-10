import "./adminHeader.scss";
import { Button, Flex, Dropdown, message, Space } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import { logout } from "../../utils/auth";

export default function AdminHeader() {
    const [user, setUser] = useRecoilState(userState);
    const navigate = useNavigate();
    const onClick = ({ key }) => {
        switch (key) {
            case "1":
                message.info("Duyệt bài viết");
                navigate(`/on-pending`);
                break;
            case "2":
                message.info("Xem tất cả người dùng");
                navigate(`/all-users`);
                break;
            case "3":
                message.info("Xem các đơn tố cáo");
                navigate(`/all-reports`);
                break;
            case "4":
                message.success({
                    message: "Đăng xuất thành công",
                });
                logout();

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
            label: "Duyệt bài viết",
            key: "1",
        },
        {
            label: "Xem người dùng",
            key: "2",
        },
        {
            label: `Xem đơn tố cáo`,
            key: "3",
        },
        {
            label: "Đăng xuất",
            key: "4",
        },
    ];
    return (
        <header>
            <div className="wrapper">
                <Flex justify="space-between" align="center">
                    <Link to="/admin" className="header-logo">
                        <h3>RentFind</h3>
                    </Link>
                    <Flex align="center" gap="30px">
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
                                                Quản lý, {user.data.full_name}
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
