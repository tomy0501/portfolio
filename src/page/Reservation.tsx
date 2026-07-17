import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useNavigate ,useParams} from "react-router-dom"
import { Header } from "@/components/Header"
import { ReservationLists } from "@/components/Reservation"

export type Int16OrNull = {
    Int16: number,
    Valid: boolean
}

export type StringOrNull = {
    String: string,
    Valid: boolean
}

export type Gender = 'male' | 'female' | 'other' | 'unknown'

export const GENDER_LABELS: Record<Gender,string> = {
    male : '男性',
    female : '女性',
    other : 'その他',
    unknown : '不明'
} as const;

export const getGenderLabel = (gender: Gender): string => {
  return GENDER_LABELS[gender];
};

export type GenderOrNull = {
    String: Gender,
    Valid : boolean
}

export type Guest = {
    GuestID: string,
    GuestName: string,
    GuestAge: Int16OrNull,
    GuestSex: GenderOrNull,
    GuestFrom: StringOrNull,
    Checkin: StringOrNull,
    Checkout: StringOrNull
    Room: Room
}

export type Room = {
    RoomID: string,
    RoomName: string,
    RoomType: string
}
export type Reservation = {
    ReservationID: string,
    RepresentGuest: Guest,
    Guests: Guest[]
}

type ReservationMessage = {
    message: string,
    value: Reservation[] | null
}
export const HotelReservation= () =>{
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
                console.log(data)
                if(data.data.value == null){
                    setErrorMessage("予約情報は存在しません。")
                }else{
                     setReservations(data.data.value)
                }
               
                setIsLoading(false)
            }catch(error){
                setErrorMessage("予約情報が取得できませんでした")
                console.log(error)
            }
            }
            getAllReservation()
        },[])
        return (
            <div className='w-full'>
            <Header userName={userName} logout={auth.logout}
            ></Header>
            <ReservationLists reservations={reservations} isLoading={isLoading} errorMessage={errorMessage}/>
            </div>
            
           
        )
    }catch(error){
       
    }
}