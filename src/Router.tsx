import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";
import { RootLayout } from "./page/RouterLayout";
import { HotelReservation } from "./page/Reservation";
import { Hotel } from "./page/Hotel"

export const router = createBrowserRouter([
    {
        path: "/",
        element:  <RootLayout />,
        children:[
            {
                index:true,
                loader: () => redirect("/home")
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path:"/hotels/:hotelID",
                element:<Hotel />,                              
            },
            {
                path: "/hotels/:hotelID/reservation",
                element: <HotelReservation />
            }
        ]
        
    }
   ]);
