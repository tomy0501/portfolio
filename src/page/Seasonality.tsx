import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "@/utils/api"
import { SeasonalityTable } from "@/components/SeasonalityPage";

export type Seasonality = {
    sesonalityID: string,
    seasonalityName:string
}

type SeasonalityMessage = {
    message: string,
    value: Seasonality[]
}

export type SeasonalityPrice = {
    sesonalityNumberID: string,
    numberOfPeople: number,
    price: number
}

type SeasonalityPriceMessage = {
    message: string,
    value: SeasonalityPrice[]
}
export const Seasonality = () =>{
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [seasonality,setSeasonality] = useState<Seasonality[]|null>(null)
    const {hotelID} = useParams()
    const getSeasonalityPrice = async (seasonalityID:string) => {
        try{
            const price = await api.get<SeasonalityPriceMessage>(`/api/seasonalityPrice/${hotelID}/${seasonalityID}`)
            if(price.status !== 200){
                throw new Error("cant get price")
            }
            return price.data.value
        }catch(error:any){
            console.log(error)
            return null
        }
    } 
    useEffect(() =>{
        const getSeasonality = async () => {
            try{
                const seasonality = await api.get<SeasonalityMessage>(`/api/seasonality/${hotelID}`)
                if(seasonality.status !== 200){
                    throw new Error("can't get seasonality")
                }
                setSeasonality(seasonality.data.value)
            }catch(error:any){
                setErrorMessage("シーズナリティが取得できませんでした")
                console.log(error)
            }finally{
                setIsLoading(true)
            }
        }
        getSeasonality()
    },[])
    return (
        <SeasonalityTable seasonality={seasonality} isLoading={isLoading} errorMessage={errorMessage} getSeasonalityDetail={getSeasonalityPrice}/>
    )
}

