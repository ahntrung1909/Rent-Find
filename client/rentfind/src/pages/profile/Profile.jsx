import "./profile.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

import {
    ProForm,
    ProFormText,
    ProFormDatePicker,
    ProFormSelect,
    viVNIntl,
} from "@ant-design/pro-components";
import { ConfigProvider } from "antd";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atom";

import axios from "axios";

export default function Profile() {
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
        const response = await fetch(
            `http://localhost:3000/api/public/vapi/province/district/${value}`
        );
        const result = await response.json();

        const data = result.results;
        setDistricts(data);
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrict(value);
        setWards([]);
        const response = await fetch(
            `http://localhost:3000/api/public/vapi/province/ward/${value}`
        );
        const result = await response.json();

        const data = result.results;
        setWards(data);
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
                    Thông tin người dùng
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
                    console.log(values);
                }}
                onReset={() => {
                    window.location.href = "http://localhost:5173/";
                }}
            >
                <ProFormText
                    name="fullName"
                    label="Tên người dùng"
                    value={user?.data.full_name}
                    placeholder="Nhập tên người dùng"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên người dùng",
                        },
                    ]}
                />

                <ConfigProvider locale={viVNIntl}>
                    <ProFormDatePicker
                        name="dob"
                        label="Nhập ngày tháng năm sinh:"
                        value={user?.data.dob}
                        placeholder={"Date of Birth"}
                        fieldProps={{
                            size: "large",
                        }}
                        style={{
                            width: 1000,
                            display: "flex",
                        }}
                    />
                </ConfigProvider>

                <ProFormText
                    name="phoneNumber"
                    label="Số điện thoại"
                    value={user?.data.phone_number}
                    placeholder="Nhập số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số điện thoại",
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: "Số điện thoại không hợp lệ",
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
                            value: province.province_id,
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
                        value: district.district_id,
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
                        value: ward.ward_id,
                    }))}
                    disabled={!wards.length}
                    rules={[
                        { required: true, message: "Vui lòng chọn phường/xã" },
                    ]}
                />

                <ProFormText
                    name={["address", "description"]}
                    label="Địa chỉ cụ thể"
                    placeholder="Địa chỉ cụ thể"
                />
            </ProForm>
        </div>
    );
}

// const [cities, setCities] = useState([]);
// const [districts, setDistricts] = useState([]);
// const [wards, setWards] = useState([]);

// useEffect(() => {
//     // Fetch the list of cities
//     axios
//         .get("https://vapi.vnappmob.com/api/province")
//         // {
//         //     headers: {
//         //         "Access-Control-Allow-Origin": "*",
//         //         "Access-Control-Allow-Methods":
//         //             "GET, POST, PATCH, PUT, DELETE",
//         //     },
//         // }
//         .then((response) => {
//             setCities(response.data.results);
//         })
//         .catch((error) => {
//             console.error("There was an error fetching the cities!", error);
//         });
// }, []);

// const handleCityChange = (value) => {
//     // Fetch the list of districts based on selected city
//     axios
//         .get(`https://vapi.vnappmob.com/api/province/district/${value}`)
//         .then((response) => {
//             setDistricts(response.data.results);
//             setWards([]); // Clear wards when city changes
//         })
//         .catch((error) => {
//             console.error(
//                 "There was an error fetching the districts!",
//                 error
//             );
//         });
// };

// const handleDistrictChange = (value) => {
//     // Fetch the list of wards based on selected district
//     axios
//         .get(`https://vapi.vnappmob.com/api/province/ward/${value}`)
//         .then((response) => {
//             setWards(response.data.results);
//         })
//         .catch((error) => {
//             console.error("There was an error fetching the wards!", error);
//         });
// };
