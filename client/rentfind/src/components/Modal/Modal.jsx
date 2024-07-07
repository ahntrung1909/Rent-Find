import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import {
    ProForm,
    ProFormTextArea,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import axios from "axios";

function FormModal({ isModalOpen, setIsModalOpen }) {
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log("values:" + values);
        axios
            .post("http://localhost:3000/api/report/upload-report", values)
            .then((res) => {
                console.log("res: " + res);
                // if (res.status === 200) {
                //     message.success("Tạo bài viết thành công !");
                //     setTimeout(() => {
                //         window.location.href = "http://localhost:5173/";
                //     }, 1000);
                // }
            })
            .catch((err) => {
                // message.error("Tạo bài viết thất bại !");
                console.log(err);
            });
    };

    return (
        <>
            <Modal
                title="Tố cáo bài viết"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <ProForm
                    onFinish={onFinish}
                    submitter={{
                        searchConfig: {
                            submitText: "Lưu",
                            resetText: "Hủy",
                        },
                    }}
                >
                    <ProFormTextArea
                        name="textarea"
                        label="Lý do tố cáo"
                        placeholder="Hãy nhập nội dung"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập lý do tố cáo",
                            },
                        ]}
                    />
                    <ProFormUploadButton
                        name="image"
                        label="Minh chứng"
                        title="Chọn để nhập"
                        fieldProps={{
                            beforeUpload: () => false, // Prevent the upload automatically
                        }}
                    />
                </ProForm>
            </Modal>
        </>
    );
}

export default FormModal;
