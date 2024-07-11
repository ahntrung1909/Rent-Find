import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import {
    ProForm,
    ProFormTextArea,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom.js";

function FormModal({ item, isModalOpen, setIsModalOpen }) {
    const [user, setUser] = useRecoilState(userState);
    // console.log(item);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleFinish = (values) => {
        console.log("values:" + values);
        axios
            .post("http://localhost:3000/api/report/upload-report", {
                ...values, //textarea = reason //image = tạo 1 ảnh mới ở imgReport và đẩy lên cloudinary
                //send_at làm ở backend dùng date.now()
                accuser: user.data.id,
                accused: item.user_id,
                post_id: item.id,
                //result, status, action default
                //verifier verifyAt xu ly cho khac
            })
            .then((res) => {
                console.log("res: " + res);
                if (res.status === 200) {
                    message.success("Tố cáo thành công!");
                    setTimeout(() => {
                        window.location.href = "http://localhost:5173/";
                    }, 1000);
                }
            })
            .catch((err) => {
                message.error("Tố cáo thất bại ! || Lỗi hệ thống !");
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
                    onFinish={handleFinish}
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
                        name="images"
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
