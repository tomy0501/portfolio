import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";
import { RootLayout } from "./page/RouterLayout";
import { Hotel } from "./page/Hotel";

export const router = createBrowserRouter([
    {
        path: "/",
        element:  <RootLayout />,
        children:[
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "hotels/:hotelID",
                element: <Hotel />
            }
        ]
    }
   ]);
