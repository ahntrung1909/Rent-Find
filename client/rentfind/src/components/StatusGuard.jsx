import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setStatus(decodedToken.status);
        } else {
            setStatus(null);
        }
    }, []);
    // console.log(status);

    return !!localStorage.getItem("accessToken") && status === "banned" ? (
        <div style={{ textAlign: "center", marginTop: 100 }} className="user">
            <h2 style={{ textAlign: "center", marginBottom: 16 }}>
                Bạn không có quyền truy cập do tài khoản đang bị cấm!
            </h2>
            <button
                style={{
                    textAlign: "center",
                    padding: 12,
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#1678ff",
                    color: "white",
                    marginBottom: 50,
                }}
                onClick={handleGoBack}
            >
                Quay lại
            </button>
        </div>
    ) : (
        children
    );
}
