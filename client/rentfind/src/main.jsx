import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { routers } from "./utils/routers";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")).render(
    <RecoilRoot>
        <RouterProvider router={routers}>
            <App />
        </RouterProvider>
    </RecoilRoot>
);
