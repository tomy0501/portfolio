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

export type StockProperty = 'stock' | 'reserve' | 'stopCell'

type RoomStockMessage = {
    message:string,
    roomStocks:RoomStocks
}
export const StockCalender = () => {
    const apiFunction = async (changeDate:string,changeProperty:StockProperty,newNumber:number) : Promise<StockChangeMessage> =>{
        const result =  await api.get<StockChangeMessage>(`stockAPI/stockChange/${changeProperty}/${changeDate}/${newNumber}`)
        if(result.status !== 200){
            throw new Error("cannnot get stock")
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
                    throw new Error("cannot accept")
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
        <StockCalenderComponent isLoading={isLoading} date={date} errorMessage={errorMessage} calenderStocks={roomStock} apiFunction={apiFunction}/>
    )
}