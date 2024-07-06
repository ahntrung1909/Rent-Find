import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import HomePage from "../pages/homePage/HomePage";
import ErrorPage from "../ErrorPage";
import Profile from "../pages/profile/Profile";
import UploadPost from "../pages/uploadPost/UploadPost";
import AuthGuard from "../components/AuthGuard";
import PostDetails from "../pages/postDetails/PostDetails";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import ChangePassword from "../pages/resetPassword/ChangePassword";
import LikedPosts from "../pages/likedPosts/LikedPosts";
import AboutUs from "../pages/aboutUs/AboutUs";
import MyPosts from "../pages/myPosts/MyPosts";
import HiddenPosts from "../pages/hiddenPosts/HiddenPosts";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: (
            <Layout>
                <ErrorPage />
            </Layout>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/change-password",
                element: (
                    <AuthGuard>
                        <ChangePassword />,
                    </AuthGuard>
                ),
            },
            {
                path: "/reset-password",
                element: <ResetPassword />,
            },
            {
                path: "/user-information/:id",
                element: (
                    <AuthGuard>
                        <Profile />,
                    </AuthGuard>
                ),
            },
            {
                path: "/upload-post",
                element: (
                    <AuthGuard>
                        <UploadPost />,
                    </AuthGuard>
                ),
            },
            {
                path: "/post/:id",
                element: <PostDetails />,
            },
            {
                path: "/my-posts/:id",
                element: (
                    <AuthGuard>
                        <MyPosts />
                    </AuthGuard>
                ),
            },
            {
                path: "/my-hidden-posts/:id",
                element: (
                    <AuthGuard>
                        <HiddenPosts />
                    </AuthGuard>
                ),
            },
            {
                path: "/liked-posts/:id",
                element: (
                    <AuthGuard>
                        <LikedPosts />
                    </AuthGuard>
                ),
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
        ],
    },
]);
