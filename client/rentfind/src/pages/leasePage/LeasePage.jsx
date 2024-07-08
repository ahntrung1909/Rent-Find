import React, { useState, useEffect } from "react";
import List from "../../components/List/list";
import {
    ProFormSelect,
    ProForm,
    ProFormText,
} from "@ant-design/pro-components";
import axios from "axios";
import "./leasePage.scss";
function LeasePage() {
    const [leasePagePosts, setLeasePagePosts] = useState([]);
    const [typePost, setTypePost] = useState("LEASE");
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const fetchProvinces = async () => {
        const response = await fetch(
            "http://localhost:3000/api/public/vapi/province"
        );
        const result = await response.json();
        const data = result.results;
        setProvinces(data);
    };

    useEffect(() => {
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

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/post/get-lease-posts"
            );
            const data = await response.data;
            // console.log(data);

            const detailedPostsPromises = data.map(async (leasePagePosts) => {
                let userResponse;
                try {
                    userResponse = await axios.get(
                        `http://localhost:3000/api/user/user-information/${leasePagePosts.user_id}`
                    );
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log("Image post not found, skipping...");
                        userResponse = { data: null };
                    } else {
                        throw error;
                    }
                }
                // const userResponse = await axios.get(
                //     `http://localhost:3000/api/user/user-information/${leasePagePosts.user_id}`
                // );
                const addressResponse = await axios.get(
                    `http://localhost:3000/api/addresses/address-information/${leasePagePosts.post_address_id}`
                );

                let imgPostResponse;
                try {
                    imgPostResponse = await axios.get(
                        `http://localhost:3000/api/img-post/img/${leasePagePosts.id}`
                    );
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        console.log("Image post not found, skipping...");
                        imgPostResponse = { data: null };
                    } else {
                        throw error;
                    }
                }

                return {
                    ...leasePagePosts,
                    User: userResponse.data,
                    Address: addressResponse.data,
                    ImgPosts: imgPostResponse.data,
                };
            });

            const detailedPosts = await Promise.all(detailedPostsPromises);
            console.log(detailedPosts);
            setLeasePagePosts(detailedPosts);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container" style={{ marginBottom: "50px" }}>
            <h1 style={{ marginBottom: "50px" }}>Tìm kiếm chỗ thuê ưng ý</h1>
            <div className="content">
                <div className="left">
                    {leasePagePosts.length > 0 ? (
                        <List listPost={leasePagePosts} type={typePost} />
                    ) : (
                        <>
                            <p>Không tìm thấy dữ liệu!</p>
                        </>
                    )}
                </div>
                <div className="right">
                    <h2
                        style={{
                            marginBottom: "15px",
                            position: "relative",
                            top: "-4px",
                        }}
                    >
                        Tìm kiếm
                    </h2>
                    <ProForm
                        submitter={{
                            searchConfig: {
                                submitText: "Tìm",
                            },
                            resetButtonProps: false,
                        }}
                        onFinish={async (values) => {
                            console.log(values);
                            const response = await axios.post(
                                `http://localhost:3000/api/post/search`,
                                values
                            );
                            const data = await response.data;
                            console.log(data);
                            // if (data.length === 0) {
                            //     message.info(
                            //         "Không có dữ liệu tìm kiếm!"
                            //     );
                            //     return;
                            // }
                            setLeasePagePosts(data);
                        }}
                    >
                        <ProFormText
                            name="title"
                            label="Từ khóa"
                            placeholder="Nhập từ khóa tìm kiếm"
                        />
                        <ProFormSelect
                            name="price"
                            label="Giá"
                            placeholder="Chọn khoảng giá"
                            options={[
                                // { label: "Chọn khoảng giá", value: "" },
                                {
                                    label: "Dưới 1 triệu",
                                    value: "under_1_million",
                                },
                                {
                                    label: "1 đến 2 triệu",
                                    value: "1_to_2_million",
                                },
                                {
                                    label: "2 đến 3 triệu",
                                    value: "2_to_3_million",
                                },
                                {
                                    label: "3 đến 5 triệu",
                                    value: "3_to_5_million",
                                },
                                {
                                    label: "5 đến 7 triệu",
                                    value: "5_to_7_million",
                                },
                                {
                                    label: "7 đến 10 triệu",
                                    value: "7_to_10_million",
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
                        />
                    </ProForm>
                </div>
            </div>
        </div>
    );
}

export default LeasePage;
