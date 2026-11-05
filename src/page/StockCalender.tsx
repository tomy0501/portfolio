import { useEffect, useState } from "react"
import { api } from "@/utils/api"
import { useParams} from "react-router-dom"
import { StockCalenderComponent } from "@/components/StockCalenderComponent"


export type StockCalender= {
    date: string,
    stock: number,
    reserved: number,
    stopped: number
}

export type RoomStocks = {
    room_type_id: string,
    stock_data: StockCalender[]
}

export type StockChangeMessage = {
    stockType : StockProperty,
    afterChangeNumber : number,
    beforeChangeNumber :number
}

export type StockProperty = 'stock' | 'reserved' | 'stopSell'

type RoomStockMessage = {
    message:string,
    roomStocks:RoomStocks
}

export type StockChangeProperty = {
    changeProperty:StockProperty,
    newNumber:number,
}
export const StockCalender = () => {
    const apiFunction = async (changeDate:string,stockChangeProperties:StockChangeProperty[],hotelID:string,roomTypeID:string) : Promise<StockChangeMessage> =>{
        const result =  await api.post<StockChangeMessage>(`/stockAPI/stockChangeAPI/stock/${hotelID}`,{
            RoomTypeID:roomTypeID,
            Date:changeDate,
            StockChangeProperties:stockChangeProperties
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(result.status !== 200){
            throw new Error("cannot accept")
        }
        return result.data
    }
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [roomStock,setRoomStock] = useState<RoomStocks|null>(null)
    const {hotelID,roomTypeID,year,month} = useParams()
    const parseYear = Number(year)
    const parseMonth = Number(month)
    const date = new Date(parseYear,parseMonth - 1)
    useEffect(() =>{
        const fetchStock = async() => {
            try{
                const result = await api.get<RoomStockMessage>(`/stockAPI/stock/${hotelID}/${roomTypeID}/${year}/${month}`)
                if(result.status !== 200){
                    return Promise.reject("cannot accept")
                }
                setRoomStock(result.data.roomStocks)
            }catch(error:any){
                setErrorMessage(error)
            }finally{
                setIsLoading(false)
            }
            
        }
        fetchStock()
    },[])
    return (
        <StockCalenderComponent isLoading={isLoading} date={date} errorMessage={errorMessage} calenderStocks={roomStock} apiFunction={apiFunction} hotelID={hotelID} roomTypeID={roomTypeID}/>
    )
}