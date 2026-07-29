import { useEffect,useState } from "react"
import { api } from "@/utils/api"
import { useParams,useNavigate } from "react-router-dom"
import { RoomTable } from "@/components/RoomTable"
type Room = {
    RoomID: string,
    RoomName:string,
    RoomType:string
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
    const jumpRoomDetail = (roomID:string) =>{
        navigate(roomID)
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
        <RoomTable errorMessage={errorMessage} isLoading={isLoading} rooms={rooms} gotoRoomDetail={jumpRoomDetail}></RoomTable>
    )
}