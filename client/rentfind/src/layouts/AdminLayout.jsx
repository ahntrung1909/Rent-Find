import { Outlet, useRouteError } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ErrorPage from "../ErrorPage";
import React, { useEffect } from "react";
import "./adminLayout.scss";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom";
import { checkJwt } from "../utils/jwt";
import { getUserProfile } from "../API/users";
import AdminHeader from "../components/AdminHeader/AdminHeader";

function ErrorBoundary({ children }) {
    const error = useRouteError();
    if (error) {
        return <ErrorPage />;
    }
    return children;
}

export default function AdminLayout() {
    const [user, setUser] = useRecoilState(userState);
    const haveUserProfile = async () => {
        const userId = await checkJwt();

        if (userId) {
            let userInfo = await getUserProfile(userId);
            // console.log("userInfo", userInfo);

            setUser(userInfo);
        } else {
            setUser(null);
        }
    };
    useEffect(() => {
        haveUserProfile();
    }, [setUser]);
    return (
        <div className="root">
            <AdminHeader />
            <main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>
        </div>
    );
}
