import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";
import { RootLayout } from "./page/RouterLayout";
import { HotelReservation } from "./page/Reservation";
import { Hotel } from "./page/Hotel"
import { DashboardLayout } from "./page/Dashboard";
import { RoomPage } from "./page/Room";

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
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "",
                element: <Home />,
                children:[
                    {
                        path:"/home",
                        element:<DashboardLayout/>
                    },
                    {
                        path:"/hotels/:hotelID",
                        element:<Hotel />,                              
                    },
                    {
                        path: "/hotels/:hotelID/reservation",
                        element: <HotelReservation />
                    },
                    {
                        path:"/hotels/:hotelID/room",
                        element:<RoomPage/>
                    }
                ]
            },
          
        ]
        
    }
   ]);
