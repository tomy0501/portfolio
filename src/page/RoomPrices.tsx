import { useState,useEffect } from 'react'
import { api } from '@/utils/api'
import { useParams } from 'react-router-dom'
import { DatePriceCalendar } from '@/components/CalenderBase'
export type SeasonalityPrices = {
    numberOfPeople: number,
    price : number
}
export type CalenderPrice = {
    day: Date,
    seasonality: SeasonalityPrices[]
}

export type CalenderPriceMessage = {
    message:string,
    value:CalenderPrice[]
}

export const RoomPrice = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [errorMessage,isSetErrorMessage] = useState<string>("")
    const [calenderPrices,setCalenderPrices] = useState<CalenderPrice[]|null>(null)
    const {hotelID,roomTypeID,month} = useParams()
    useEffect(() =>{
        const getCalenderPrices = async () => {
            try{
                const result = await api.get<CalenderPriceMessage>(`/api/priceCalender/${hotelID}/${roomTypeID}/${month}`)
                if(result.status !== 200){
                    throw new Error("status Error")
                }
                setCalenderPrices(result.data.value)
            }catch(error:any){
                console.log(error)
                isSetErrorMessage("値段の取得に失敗しました。")
            }finally{
                setIsLoading(false)
            }
        }
        getCalenderPrices()
    },[])
    return <DatePriceCalendar isLoading={isLoading} errorMessage={errorMessage} calenderPrices={calenderPrices}/>
}