import Header from "../components/Header/Header";
import { Outlet, useRouteError } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ErrorPage from "../ErrorPage";
import React, { useEffect } from "react";
import "./layout.scss";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/atom";
import { checkJwt } from "../utils/jwt";
import { getUserProfile } from "../API/users";

function ErrorBoundary({ children }) {
    const error = useRouteError();
    if (error) {
        return <ErrorPage />;
    }
    return children;
}

export default function Layout() {
    const [user, setUser] = useRecoilState(userState);
    const abc = async () => {
        console.log("12345");
        const userId = await checkJwt();

        if (userId) {
            let userInfo = await getUserProfile(userId);
            console.log("user", userInfo);

            setUser(userInfo);
        } else {
            setUser(null);
        }
    };
    useEffect(() => {
        abc();
        console.log("user", user);
    }, [setUser]);
    return (
        <div className="root">
            <Header />
            <main>
                <ErrorBoundary>
                    <Outlet />
                </ErrorBoundary>
            </main>
            <Footer />
        </div>
    );
}
