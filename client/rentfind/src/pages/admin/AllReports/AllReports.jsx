import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message, Tooltip } from "antd";
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
        const statusText =
            {
                true: "Duyệt",
                false: "Chưa duyệt",
            }[item.status] || "";

        const resultText =
            {
                true: "Thành công",
                false: "Không thành công",
            }[item.result] || "";

        const actionText =
            {
                warn: "Cảnh cáo",
                banned: "Cấm",
                false: "Không vi phạm",
            }[item.action] || "";

        return {
            key: item.id,
            id: item.id,
            accuser: item.AccuserUser.full_name
                ? item.AccuserUser.full_name
                : item.accuser,
            accused: item.AccusedUser.full_name
                ? item.AccusedUser.full_name
                : item.accused,
            accusedId: item.accused,
            accuserId: item.accuser,
            postTitle: item.PostReport.title,
            reason: item.reason,
            imgUrl:
                item.ImgReports.length > 0
                    ? item.ImgReports[0].img_url
                    : "Không có",
            action: actionText,
            status: statusText,
            result: resultText,
            sendAt: item.send_at,
            verifier: item.verifier ? item.verifier : "Chưa có",
            verify_at: item.verify_at ? item.verify_at : "Chưa có",
        };
    });

    const handleReportSuccess = async (id, accused) => {
        message.info(
            "Đơn tố cáo đang được xử lý, vui lòng chờ trong giây lát!"
        );
        try {
            const res = await axios.post(
                `http://localhost:3000/api/admin/report-success/${id}`,
                { status: true, result: true, accusedId: accused }
            );
            if (res.status === 200) {
                message.success("Duyệt tố cáo thành công!");
            }
            getallReports();
            // setTimeout(() => {
            //     window.location.href = "http://localhost:5173/all-reports";
            // }, 750);
        } catch (error) {
            console.error("Error censoring post:", error);
            message.error("Duyệt tố cáo thất bại!");
        }
    };

    const handleReportUnsuccess = async (id, accuser, accused) => {
        message.info(
            "Đơn tố cáo đang được xử lý, vui lòng chờ trong giây lát!"
        );
        try {
            const res = await axios.post(
                `http://localhost:3000/api/admin/report-unsuccess/${id}`,
                {
                    status: true,
                    result: false,
                    accuserId: accuser,
                    accusedId: accused,
                }
            );
            if (res.status === 200) {
                message.success("Hủy duyệt tố cáo thành công!");
            }
            console.log(res.data);
            getallReports();
            // setTimeout(() => {
            //     window.location.href = "http://localhost:5173/all-reports";
            // }, 750);
        } catch (error) {
            console.error("Error censoring post:", error);
            message.error("Hủy duyệt tố cáo thất bại!");
        }
    };

    const columns = [
        {
            title: "Id đơn tố cáo",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Người tố cáo",
            dataIndex: "accuser",
            key: "accuser",
        },
        {
            title: "Người bị tố cáo",
            dataIndex: "accused",
            key: "accused",
        },
        {
            title: "Tiêu đề bài viết",
            dataIndex: "postTitle",
            key: "postTitle",
        },
        {
            title: "Lý do",
            dataIndex: "reason",
            key: "reason",
        },
        {
            title: "Ảnh",
            dataIndex: "imgUrl",
            key: "imgUrl",
            render: (value) => (
                <Tooltip title={value}>
                    <a href={value} target="_blank" rel="noopener noreferrer">
                        Link
                    </a>
                </Tooltip>
            ),
        },
        {
            title: "Được gửi vào",
            dataIndex: "sendAt",
            key: "sendAt",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Kết quả",
            dataIndex: "result",
            key: "result",
        },
        {
            title: "Người kiểm duyệt",
            dataIndex: "verifier",
            key: "verifier",
        },
        {
            title: "Duyệt vào lúc",
            dataIndex: "verify_at",
            key: "verify_at",
        },
        {
            title: "Tùy chọn",
            key: "action",
            render: (_, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleReportSuccess(record.id, record.accusedId)
                        }
                    >
                        Duyệt đơn
                    </Button>
                    <Button
                        type="secondary"
                        onClick={() =>
                            handleReportUnsuccess(
                                record.id,
                                record.accuserId,
                                record.accusedId
                            )
                        }
                    >
                        Hủy đơn
                    </Button>
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
                    Quản lý đơn tố cáo
                </h3>
                <ProForm
                    submitter={{
                        searchConfig: {
                            submitText: "Tìm",
                            resetText: "Quay lại",
                        },
                    }}
                    onFinish={async (values) => {
                        const full_name = values.full_name;
                        if (!full_name) {
                            message.info("Vui lòng nhập từ khóa tìm kiếm!");
                            return;
                        }
                        await axios
                            .get(
                                `http://localhost:3000/api/admin/search-accused-by-fullName/${full_name}`
                            )
                            .then((res) => {
                                if (res.status === 200) {
                                    console.log(res.data);
                                    setAllReports(res.data);
                                }
                            })
                            .catch((err) => {
                                message.error(
                                    "Từ khóa tìm kiếm không tồn tại!"
                                );
                                console.log(err);
                            });
                    }}
                    onReset={() => {
                        window.location.href =
                            "http://localhost:5173/all-reports";
                    }}
                >
                    <ProFormText
                        name="full_name"
                        label="Tên người bị tố cáo"
                        placeholder="Nhập từ khóa tìm kiếm"
                    />
                </ProForm>
                <div className="content">
                    {allReports.count === 0 ? (
                        <p>Không có đơn tố cáo nào cần duyệt</p>
                    ) : (
                        <AdminList dataSource={dataSource} columns={columns} />
                    )}
                </div>
            </div>
        </>
    );
}
