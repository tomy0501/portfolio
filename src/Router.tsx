import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/home",
        element: <Home />
    }
]);
