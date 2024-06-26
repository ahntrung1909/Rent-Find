import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import HomePage from "../pages/homePage/HomePage";
import ErrorPage from "../ErrorPage";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Profile from "../pages/profile/Profile";
import UploadPost from "../pages/uploadPost/UploadPost";
import AuthGuard from "../components/AuthGuard";
import PostDetails from "../pages/postDetails/PostDetails";

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
                element: <ChangePassword />,
            },
            {
                path: "/profile",
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
                element: <PostDetails></PostDetails>,
            },
        ],
    },
]);
