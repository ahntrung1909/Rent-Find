import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message } from "antd";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
} from "@ant-design/pro-components";
import AdminList from "../../../components/AdminList/AdminList";
import "./allReports.scss";

export default function AllReports() {
    const [allReports, setAllReports] = useState([]);
    const [typePage, setTypePage] = useState("ALL_REPORTS");

    const getallReports = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-reports"
            );
            console.log(response.data);
            setAllReports(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getallReports();
    }, []);

    const dataSource = allReports.data?.map((item) => {
        return {
            key: item.id,
            id: item.id,
            accuser: item.accuser,
            accused: item.accused,
            postId: item.post_id,
            reason: item.reason,
            action: item.action,
            status: item.status.toString(),
            result: item.result.toString(),
            sendAt: item.send_at,
        };
    });

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Accuser",
            dataIndex: "accuser",
            key: "accuser",
        },
        {
            title: "Accused",
            dataIndex: "accused",
            key: "accused",
        },
        {
            title: "Post Id",
            dataIndex: "postId",
            key: "postId",
        },
        {
            title: "Reason",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Send At",
            dataIndex: "sendAt",
            key: "sendAt",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Result",
            dataIndex: "result",
            key: "result",
        },
        {
            title: "Tùy chọn",
            key: "action",
            render: () => (
                <>
                    <Button type="primary">Duyệt</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="container">
                <h3
                    style={{
                        textAlign: "center",
                    }}
                >
                    Tất cả đơn tố cáo
                </h3>
                <ProForm
                    submitter={{
                        searchConfig: {
                            submitText: "Tìm",
                        },
                        resetButtonProps: false,
                    }}
                    onFinish={async (values) => {
                        console.log(values);
                    }}
                >
                    <ProFormText
                        name="title"
                        label="Từ khóa"
                        placeholder="Nhập từ khóa tìm kiếm"
                        className="custom-width"
                    />
                </ProForm>
                <div className="content">
                    <AdminList dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </>
    );
}
