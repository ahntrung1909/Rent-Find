import React, { useState, useEffect } from "react";
import "./statistics.scss";
import axios from "axios";

export default function Statistics() {
    const [allUsers, setAllUsers] = useState([]);
    const [allViolatedUsers, setAllViolatedUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    // const [allUsers, setAllUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-users"
            );

            setAllUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-posts"
            );
            // console.log(response.data);
            setAllPosts(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchViolatedUsers = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/admin/get-all-violated-users"
            );
            console.log(response.data);
            setAllViolatedUsers(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchViolatedUsers();
    }, []);

    return (
        <div className="statistics1">
            <h3>Số lượng người dùng: {allUsers.count}</h3>
            <h3>Số lượng bài viết: {allPosts.count}</h3>
            <h3>Số lượng người dùng vi phạm: {allViolatedUsers.count}</h3>
        </div>
    );
}
