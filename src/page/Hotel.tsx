import { useAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useNavigate ,useParams} from "react-router-dom"
import { Header } from "@/components/Header"
import { HotelIndex } from "@/components/HotelIndex"

export type Authoritys = "staff" | "owner" | "other"

export type HotelInfos = {
    authority:Authoritys,
    hotelName:string,
}

export type HotelMessages = {
    message:string,
    value:HotelInfos
}
export const Hotel = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const {hotelID} = useParams()
    const userName = auth.userName
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [hotelData,setHotelData] = useState<HotelInfos|null>(null)
    const getReservation = (hotelID:string) => {
        navigate(`/hotels/${hotelID}/reservation`)
    }
    const getRoom = (hotelID:string) => {
        navigate(`/hotels/${hotelID}/room`)
    }

    const getGuest = (hotelID:string) => {
        navigate(`/hotels/${hotelID}/guest`)
    }
    const setSeasonality = (hotelID:string) => {
        navigate(`/hotels/${hotelID}/seasonality`)
    }
    if (userName === ""){
        navigate("/login")
    }
    useEffect(() => {
        const getHotelInfo = async () =>{
            try{
                const hotelInfo = await api.get<HotelMessages>(`/api/hotel/${hotelID}`)
                if(hotelInfo.data?.value == null){
                    setErrorMessage("ホテルの情報がありません")
                }else{
                    setHotelData(hotelInfo.data?.value)
                }
                
            }catch(error){
                setErrorMessage("ホテル情報の取得に失敗しました。")
                console.log(error)
            }finally{
                setIsLoading(false)
            }
            
        }
        getHotelInfo()
    }
    )
    return (
        <div>
            <Header userName={userName} logout={auth.logout}/>
            <HotelIndex userName={userName} isLoading={isLoading} errorMessage={errorMessage}
             hotelInfos={hotelData} seeReservation={getReservation} seeRoomInfo={getRoom} seeCustomerInfo={getGuest}
             setSeasonality={setSeasonality} hotelID={hotelID} />
        </div>
    )
}