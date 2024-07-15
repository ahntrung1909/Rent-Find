import "./footer.scss";
import React from "react";
import { Col, Row } from "antd";
import {
    FacebookOutlined,
    GoogleOutlined,
    TwitterOutlined,
} from "@ant-design/icons";

const iconStyles = {
    marginTop: "10px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

const iconStyles2 = {
    marginTop: "10px",
    marginLeft: "15px",
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
};

export default function Footer() {
    return (
        <footer>
            <Row>
                <Col span={6}>
                    <h2>RentFind</h2>
                </Col>
                <Col span={6}>
                    <h2>Về Rent Find</h2>
                    <a href="/">Trang chủ</a> <br />
                    <a href="/about-us">Giới thiệu</a> <br />
                    <a href="#">Blog</a> <br />
                    <a href="#">Quy chế hoạt động</a> <br />
                    <a href="#">Quy chế sử dụng</a> <br />
                    <a href="/policy">Chính sách và Bảo mật</a> <br />
                    <a href="#">Liên hệ</a>
                </Col>
                <Col span={6}>
                    <h2>Hỗ trợ Khách hàng</h2>
                    <a href="#">Câu hỏi thường gặp</a> <br />
                    <a href="#">Hướng dẫn đăng tin</a> <br />
                    <a href="#">Bảng giá dịch vụ</a> <br />
                    <a href="#">Quy định đăng tin</a> <br />
                    <a href="#">Giải quyết khiếu nại</a>
                </Col>
                <Col span={6}>
                    <h2>Liên hệ với chúng tôi qua</h2>
                    <FacebookOutlined style={iconStyles} />
                    <GoogleOutlined style={iconStyles2} />
                    <TwitterOutlined style={iconStyles2} />
                </Col>
            </Row>
        </footer>
    );
}
