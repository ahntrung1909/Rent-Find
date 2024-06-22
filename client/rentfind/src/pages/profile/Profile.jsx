import "./profile.scss";
import React, { useState, useEffect } from "react";
import {
    ProForm,
    ProFormText,
    ProFormDatePicker,
    ProFormSelect,
    viVNIntl,
} from "@ant-design/pro-components";
import { ConfigProvider } from "antd";

import axios from "axios";

const UserInfoForm = () => {
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        // Fetch the list of cities
        axios
            .get("https://vapi.vnappmob.com/api/province")
            // {
            //     headers: {
            //         "Access-Control-Allow-Origin": "*",
            //         "Access-Control-Allow-Methods":
            //             "GET, POST, PATCH, PUT, DELETE",
            //     },
            // }
            .then((response) => {
                setCities(response.data.results);
            })
            .catch((error) => {
                console.error("There was an error fetching the cities!", error);
            });
    }, []);

    const handleCityChange = (value) => {
        // Fetch the list of districts based on selected city
        axios
            .get(`https://vapi.vnappmob.com/api/province/district/${value}`)
            .then((response) => {
                setDistricts(response.data.results);
                setWards([]); // Clear wards when city changes
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the districts!",
                    error
                );
            });
    };

    const handleDistrictChange = (value) => {
        // Fetch the list of wards based on selected district
        axios
            .get(`https://vapi.vnappmob.com/api/province/ward/${value}`)
            .then((response) => {
                setWards(response.data.results);
            })
            .catch((error) => {
                console.error("There was an error fetching the wards!", error);
            });
    };

    return (
        <div className="container">
            <h1
                style={{
                    margin: "20px 0",
                }}
            >
                Thông tin người dùng
            </h1>
            <ProForm
                submitter={{
                    searchConfig: {
                        submitText: "Submit",
                        resetText: "Cancel",
                    },
                }}
                onFinish={async (values) => {
                    console.log(values);
                }}
            >
                <ProFormText
                    name="username"
                    label="Tên người dùng"
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
                    options={cities.map((city) => ({
                        label: city.name,
                        value: city.id,
                    }))}
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
                        label: district.name,
                        value: district.id,
                    }))}
                    onChange={handleDistrictChange}
                    rules={[
                        { required: true, message: "Vui lòng chọn quận/huyện" },
                    ]}
                    disabled={!districts.length}
                />

                <ProFormSelect
                    name="ward"
                    label="Phường/Xã"
                    placeholder="Chọn phường/xã"
                    options={wards.map((ward) => ({
                        label: ward.name,
                        value: ward.id,
                    }))}
                    rules={[
                        { required: true, message: "Vui lòng chọn phường/xã" },
                    ]}
                    disabled={!wards.length}
                />

                <ProFormText
                    name={["address", "description"]}
                    label="Địa chỉ cụ thể"
                    placeholder="Địa chỉ cụ thể"
                />
            </ProForm>
        </div>
    );
};

export default UserInfoForm;
