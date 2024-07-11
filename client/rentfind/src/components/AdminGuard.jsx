import React from "react";

import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    return !!localStorage.getItem("accessToken") ? (
        children
    ) : (
        <Navigate to={{ pathname: "/" }} replace />
    );
}
