import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";
import { RootLayout } from "./page/RouterLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element:  <RootLayout />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
]);
