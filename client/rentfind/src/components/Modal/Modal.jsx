import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload, Modal, Input } from "antd";

const { TextArea } = Input;
export default function FormModal({ isModalOpen, setIsModalOpen }) {
    const formRef = useRef(null);

    const handleOk = () => {
        formRef.current.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log("Form values:", values);
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    ref={formRef}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                >
                    <Form.Item name="textarea" label="TextArea">
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item label="Upload" valuePropName="fileList">
                        <Upload
                            action="http://localhost:3000/api/post/upload-report-image"
                            //"http://localhost:3000/api/post/upload-report"
                            listType="picture-card"
                        >
                            <button
                                style={{ border: 0, background: "none" }}
                                type="button"
                            >
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
