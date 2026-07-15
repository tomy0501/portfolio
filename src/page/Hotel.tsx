import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useNavigate ,useParams} from "react-router-dom"
import { Header } from "@/components/Header"
import { ReservationLists } from "@/components/Reservation"

export type Int16OrNull = {
    Int16: Number,
    Valid: Boolean
}

export type StringOrNull = {
    String: String,
    Valid: Boolean
}

export type Guest = {
    GuestID: String,
    GuestName: String,
    GuestAge: Int16OrNull,
    GuestSex: StringOrNull,
    GuestFrom: StringOrNull,
    Checkin: StringOrNull,
    Checkout: StringOrNull
    GuestRoom: Room
}

export type Room = {
    RoomID: String,
    RoomName: String,
    RoomType: String
}
export type Reservation = {
    reservationID: String,
    representGuest: Guest,
    Guests: Guest[]
}

type ReservationMessage = {
    message: string,
    value: Reservation[]
}
export const Hotel= () =>{
    try{
        const auth = useAuth()
        const userName = auth.userName
        const [reservations,setReservations] = useState<Reservation[]>([])
        const [isLoading,setIsLoading] = useState<boolean>(true)
        const [errorMessage,setErrorMessage] = useState<string>("")
        const navigate = useNavigate()
        if (userName == ""){
            navigate("/home")
        }
        const {hotelID} = useParams()
        useEffect(() =>{
            const getAllReservation = async () => {
                try{
                const data = await api.get<ReservationMessage>(`/api/allReservation/${hotelID}`)
                if(data.status !== 200){
                    throw new Error("cannnot get Reservation")
                }
                setReservations(data.data.value)
                setIsLoading(false)
            }catch(error){
                setErrorMessage("予約情報が取得できませんでした")
                console.log(error)
            }
            }
            getAllReservation()
        },[])
        return (
            <>
            <Header userName={userName} logout={auth.logout}
            ></Header>
            <ReservationLists reservations={reservations} isLoading={isLoading} errorMessage={errorMessage}/>
            </>
            
           
        )
    }catch(error){
       
    }
}