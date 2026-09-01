import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "./page/Login";
import { Home } from "./page/Home";
import { RootLayout } from "./page/RouterLayout";
import { HotelReservation } from "./page/Reservation";
import { Hotel } from "./page/Hotel"
import { DashboardLayout } from "./page/Dashboard";
import { RoomPage } from "./page/Room";
import { NotFound } from "./page/NotFound";
import { Seasonality } from "./page/Seasonality";
import { Customer } from "./page/Customer";
import { RoomPrice } from "./page/RoomPrices";

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
                    },
                    {
                        path:"/hotels/:hotelID/seasonality",
                        element:<Seasonality/>
                    },
                    {
                        path:"/hotels/:hotelID/guest",
                        element:<Customer/>
                    },
                    {
                        path:"/price/:hotelID/:roomTypeID/:month",
                        element:<RoomPrice/>
                    },
                    {
                        path:"*",
                        element:<NotFound/>
                    }
                ]
            },
          
        ]
        
    }
   ]);
