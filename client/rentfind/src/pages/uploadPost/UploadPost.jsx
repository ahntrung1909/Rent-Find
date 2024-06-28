import "./uploadPost.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

import {
    ProForm,
    ProFormText,
    ProFormSelect,
    ProFormUploadButton,
} from "@ant-design/pro-components";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";
import axios from "axios";

export default function UploadPost() {
    const [user, setUser] = useRecoilState(userState);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        const fetchProvinces = async () => {
            // const data = await getProvinces();

            const response = await fetch(
                "http://localhost:3000/api/public/vapi/province"
            );
            const result = await response.json();

            const data = result.results;
            // console.log(data, "");
            setProvinces(data);
        };

        fetchProvinces();
    }, []);

    const handleCityChange = async (value) => {
        setSelectedCity(value);
        setDistricts([]);
        setWards([]);
        const selectedProvince = provinces.find(
            (province) => province.province_name === value
        );
        const provinceId = selectedProvince
            ? selectedProvince.province_id
            : null;

        if (provinceId) {
            const response = await fetch(
                `http://localhost:3000/api/public/vapi/province/district/${provinceId}`
            );
            const result = await response.json();
            const data = result.results;
            setDistricts(data);
        }
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrict(value);
        setWards([]);
        const selectedDistrict = districts.find(
            (district) => district.district_name === value
        );
        const districtId = selectedDistrict
            ? selectedDistrict.district_id
            : null;

        if (districtId) {
            const response = await fetch(
                `http://localhost:3000/api/public/vapi/province/ward/${districtId}`
            );
            const result = await response.json();
            const data = result.results;
            setWards(data);
        }
    };
    return (
        <div className="container">
            <div
                className="about"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <h1
                    style={{
                        margin: "20px 0",
                    }}
                >
                    Đăng bài viết
                </h1>
                <Link to="/">
                    Quay về trang chủ <ArrowRightOutlined />
                </Link>
                {/*tý  chỉnh  */}
            </div>
            <ProForm
                submitter={{
                    searchConfig: {
                        submitText: "Lưu",
                        resetText: "Hủy",
                    },
                }}
                onFinish={async (values) => {
                    axios
                        .post(
                            "http://localhost:3000/api/post/upload-post",
                            values
                        )
                        .then((res) => {
                            // if (res.status === 200) {
                            //     message.success("Tạo bài viết thành công !");
                            //     setTimeout(() => {
                            //         window.location.href =
                            //             "http://localhost:5173/login";
                            //     }, 1500);
                            // }
                            console.log("res: ", res);
                        })
                        .catch((err) => {
                            // message.error("Tạo bài viết thất bại !");
                            console.log(err);
                        });
                }}
                onReset={() => {
                    window.location.href = "http://localhost:5173/";
                }}
            >
                <ProFormText
                    name="title"
                    label="Tiêu đề bài viết"
                    placeholder="Nhập tiêu đề bài viết"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tiêu đề bài viết",
                        },
                    ]}
                />

                <ProFormText
                    name="postDescription"
                    label="Mô tả bài viết"
                    placeholder="Nhập mô tả bài viết"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả bài viết",
                        },
                    ]}
                />

                <ProFormUploadButton
                    name="image"
                    label="Tải ảnh lên"
                    title="Chọn để tải lên"
                    max={4}
                    fieldProps={{
                        beforeUpload: () => false, // Prevent the upload automatically
                    }}
                    rules={[{ required: true, message: "Hãy chọn ảnh" }]}
                />

                <ProFormText
                    name="price"
                    label="Giá tiền"
                    placeholder="Nhập giá tiền"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá tiền",
                        },
                    ]}
                />

                <ProFormSelect
                    name="city"
                    label="Thành phố"
                    placeholder="Chọn thành phố"
                    options={
                        provinces &&
                        provinces.map((province) => ({
                            label: province.province_name,
                            value: province.province_name,
                        }))
                    }
                    onChange={handleCityChange}
                    rules={[
                        { required: true, message: "Vui lòng chọn thành phố" },
                    ]}
                />

                <ProFormSelect
                    name="district"
                    label="Quận/Huyện"
                    placeholder="Chọn quận/huyện"
                    options={districts.map((district) => ({
                        label: district.district_name,
                        value: district.district_name,
                    }))}
                    onChange={handleDistrictChange}
                    disabled={!districts.length}
                    rules={[
                        { required: true, message: "Vui lòng chọn quận/huyện" },
                    ]}
                />

                <ProFormSelect
                    name="ward"
                    label="Phường/Xã"
                    placeholder="Chọn phường/xã"
                    options={wards.map((ward) => ({
                        label: ward.ward_name,
                        value: ward.ward_name,
                    }))}
                    disabled={!wards.length}
                    rules={[
                        { required: true, message: "Vui lòng chọn phường/xã" },
                    ]}
                />

                <ProFormText
                    name="description"
                    label="Địa chỉ cụ thể"
                    placeholder="Địa chỉ cụ thể"
                />
            </ProForm>
        </div>
    );
}
