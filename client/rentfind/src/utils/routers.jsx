import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ErrorPage from "../ErrorPage";
import ChangePassword from "../pages/changePassword/ChangePassword";

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
        ],
    },
]);
