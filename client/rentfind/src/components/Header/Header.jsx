import "./header.scss";
import { Button, Flex } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="wrapper">
        <Flex justify="space-between" align="center">
          <Link to="/" className="header-logo">
            RentFind
          </Link>
          <Flex align="center" gap="30px">
            <Link to="/">Trang chủ</Link>
            <Link to="/gioi-thieu">Về chúng tôi</Link>
            <Link to="/bang-gia">Bảng giá</Link>
            <Flex gap="10px">
              <Button type="primary" size="large" href="/register">
                Đăng ký
              </Button>
              <Button size="large" href="/login">
                Đăng nhập
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </header>
  );
}
