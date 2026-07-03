import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Dashboard } from "./components/DashBoard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);
