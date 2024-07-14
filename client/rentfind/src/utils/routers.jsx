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
import LeasePage from "../pages/leasePage/LeasePage";
import RentPage from "../pages/rentPage/RentPage";
import Messenger from "../components/Messenger/Messenger";
import AdminLayout from "../layouts/AdminLayout";
import OnPending from "../pages/admin/OnPending/OnPending";
import AllUsers from "../pages/admin/AllUsers/AllUsers";
import AllReports from "../pages/admin/AllReports/AllReports";
import AllPosts from "../pages/admin/AllPosts/AllPosts";

export const routers = createBrowserRouter([
    {
        errorElement: (
            <Layout>
                <ErrorPage />
            </Layout>
        ),
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: "/",
                        element: <HomePage />,
                    },
                    {
                        path: "/rent",
                        element: <RentPage />,
                    },
                    {
                        path: "/lease",
                        element: <LeasePage />,
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
                    {
                        path: "/messenger",
                        element: <Messenger />,
                    },
                ],
            },
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: "/admin",
                        element: <OnPending />,
                    },
                    {
                        path: "/on-pending",
                        element: <OnPending />,
                    },
                    {
                        path: "/all-users",
                        element: <AllUsers />,
                    },
                    {
                        path: "/all-reports",
                        element: <AllReports />,
                    },
                    {
                        path: "/all-posts",
                        element: <AllPosts />,
                    },
                ],
            },
        ],
    },
]);
