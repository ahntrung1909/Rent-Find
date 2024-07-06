import "./profile.scss";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

import {
    ProForm,
    ProFormText,
    ProFormDatePicker,
    ProFormSelect,
    viVNIntl,
} from "@ant-design/pro-components";
import { ConfigProvider, message } from "antd";

import axios from "axios";
import { getDecodedToken } from "../../utils/auth";

export default function Profile() {
    const [currentUser, setCurrentUser] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    let currentUserId = useParams();
    const accountUserId = getDecodedToken().id;

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/user/user-information/${currentUserId.id}`
                );
                const data = response.data;

                console.log(data);

                // Kiểm tra nếu user_address_id tồn tại
                if (data.user_address_id) {
                    const addressResponse = await axios.get(
                        `http://localhost:3000/api/addresses/address-information/${data.user_address_id}`
                    );

                    const detailedUser = {
                        ...data,
                        address: addressResponse.data,
                    };

                    console.log(detailedUser);
                    setCurrentUser(detailedUser);
                } else {
                    // Nếu user_address_id không tồn tại, chỉ gán dữ liệu user
                    setCurrentUser(data);
                }

                if (accountUserId !== currentUserId.id) {
                    setIsDisabled(true);
                    // setIsDisabled(prev => !prev);
                }
            } catch (error) {
                console.log("error: " + error);
            }
        };

        fetchUserData();
    }, []);

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
                <div style={{ marginTop: "25px" }}>
                    <Link to="/">
                        Quay về trang chủ <ArrowRightOutlined />
                    </Link>
                </div>
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
                            `http://localhost:3000/api/user/update-user-information`,
                            values
                        )
                        .then((res) => {
                            if (res.status === 200) {
                                message.success(
                                    "Chỉnh sửa người dùng thành công !"
                                );
                                setTimeout(() => {
                                    window.location.href =
                                        "http://localhost:5173/";
                                }, 1000);
                            }
                        })
                        .catch((err) => {
                            message.error("Chỉnh sửa người dùng thất bại !");
                            console.log(err);
                        });
                }}
                onReset={() => {
                    window.location.href = "http://localhost:5173/";
                }}
            >
                <ProFormText
                    name="fullName"
                    label="Tên người dùng"
                    value={currentUser.full_name}
                    placeholder="Nhập tên người dùng"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên người dùng",
                        },
                    ]}
                    disabled={isDisabled}
                />

                <ConfigProvider locale={viVNIntl}>
                    <ProFormDatePicker
                        name="dob"
                        value={currentUser.dob}
                        label="Nhập ngày tháng năm sinh:"
                        placeholder={"Date of Birth"}
                        fieldProps={{
                            size: "large",
                        }}
                        disabled={isDisabled}
                        style={{
                            width: 1000,
                            display: "flex",
                        }}
                    />
                </ConfigProvider>

                <ProFormText
                    name="phoneNumber"
                    label="Số điện thoại"
                    value={currentUser.phone_number}
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
                    disabled={isDisabled}
                />

                <ProFormSelect
                    name="city"
                    value={currentUser.address?.city}
                    label="Thành phố"
                    placeholder="Chọn thành phố"
                    options={
                        provinces &&
                        provinces.map((province) => ({
                            label: province.province_name,
                            value: province.province_name,
                        }))
                    }
                    disabled={isDisabled}
                    onChange={handleCityChange}
                    rules={[
                        { required: true, message: "Vui lòng chọn thành phố" },
                    ]}
                />

                <ProFormSelect
                    name="district"
                    label="Quận/Huyện"
                    value={currentUser.address?.district}
                    placeholder="Chọn quận/huyện"
                    options={districts.map((district) => ({
                        label: district.district_name,
                        value: district.district_name,
                    }))}
                    onChange={handleDistrictChange}
                    disabled={!districts.length || isDisabled} //kiểm tra lại
                    rules={[
                        { required: true, message: "Vui lòng chọn quận/huyện" },
                    ]}
                />

                <ProFormSelect
                    name="ward"
                    label="Phường/Xã"
                    value={currentUser.address?.ward}
                    placeholder="Chọn phường/xã"
                    options={wards.map((ward) => ({
                        label: ward.ward_name,
                        value: ward.ward_name,
                    }))}
                    disabled={!wards.length || isDisabled} //kiểm tra lại //sai sai=>sai đúng sai=>đúng sai đúng=>đúng
                    rules={[
                        { required: true, message: "Vui lòng chọn phường/xã" },
                    ]}
                />

                <ProFormText
                    name={"description"}
                    value={currentUser.address?.description}
                    label="Địa chỉ cụ thể"
                    disabled={isDisabled}
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
