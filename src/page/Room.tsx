import { useEffect,useState } from "react"
import { api } from "@/utils/api"
import { useParams,useNavigate } from "react-router-dom"
import { RoomTable } from "@/components/RoomTable"
export type Room = {
    RoomID: string,
    RoomName:string,
    RoomType:string,
    RoomTypeID:string,
    SeasonalityID:string | null,
    SeasonalityName:string | null
}

type RoomMessage = {
    message:string,
    value:Room[]
}

export const RoomPage = () =>{
    const {hotelID} = useParams()
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [rooms,setRooms] = useState<Room[]|null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const now = new Date()
    const year = now.getFullYear()

    // getMonth()は0始まりのため+1し、文字列に変換してから2桁にパディング
    const date = String(now.getMonth() + 1).padStart(2, '0'); 

    const formattedDate = `${year}-${date}`;
    const checkSeasonality = (seasonalityID:string) =>{
        navigate(`/price/${hotelID}/${seasonalityID}/${formattedDate}`)
    }
    const checkStock = (roomTypeID:string) =>{
        navigate(`/stock/${hotelID}/${roomTypeID}/${year}/${now.getMonth() + 1}`)
    }
    useEffect(() =>{
        const roomGetter = async () =>{
            try{
                const message = await api.get<RoomMessage>(`/api/allRoom/${hotelID}`)
            if(message.status !== 200){
                setErrorMessage("部屋情報が取得できませんでした")
                throw new Error()
            }
                setRooms(message.data.value)    
            }catch(error:any){
                console.log(error)
            }finally{
                setIsLoading(false)
            }
            
        }
        roomGetter()
        
    },[])
    
    return (
        <RoomTable errorMessage={errorMessage} isLoading={isLoading} rooms={rooms} checkSeasonality={checkSeasonality} checkStock={checkStock}></RoomTable>
    )
}