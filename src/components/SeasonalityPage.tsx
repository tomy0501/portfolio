import type {Seasonality,SeasonalityPrice} from "@/page/Seasonality"
import { Table,
        TableBody,
        TableHeader,
        TableCell,
        TableHead,
        TableRow
 } from "./ui/table"
 import { useState } from 'react'


type SeasonalityProperty = {
    isLoading:boolean,
    errorMessage:string,
    seasonality:Seasonality[] | null,
    getSeasonalityDetail: (seasonalityID:string) => Promise<SeasonalityPrice[]|null>
}

export const SeasonalityTable = ({isLoading,errorMessage,seasonality,getSeasonalityDetail}:SeasonalityProperty) => {
    if(isLoading){
        return <p>お待ちください。</p>
    }
    if(errorMessage !== ""){
        return <p>{errorMessage}</p>
    }
    if(seasonality == null){
        return <p>シーズナリティが存在しません</p>
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>シーズナリティ名</TableHead>
                    <TableHead>シーズナリティ人数</TableHead>
                    <TableHead>値段</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {seasonality.map(value => {
                   return (
                        <SeasonalityGetRow seasonalityName={value.seasonalityName} seasonalityID={value.seasonalityID}
                         getSeasonalityDetail={getSeasonalityDetail}/>
                   )
                })}
            </TableBody>
        </Table>
            
    )
}

type SeasonalityDetailProperty = {
    seasonalityName:string,
    seasonalityID:string,
    getSeasonalityDetail:(seasonalityID:string) => Promise<SeasonalityPrice[]|null>
}

export const SeasonalityGetRow = ({seasonalityName,seasonalityID,getSeasonalityDetail}:SeasonalityDetailProperty) =>{
    const [seasonalityPrices,setSeasonalityPrices] = useState<SeasonalityPrice[]|null>(null)
    const [toggle,setToggle] = useState<boolean>(false)
    
    const getDetailPrices = async () => {
        const seasonalityDetail = await getSeasonalityDetail(seasonalityID)
        if(seasonalityDetail === null){
            alert("シーズナリティの人数の設定がされていません")
            return
        }
        setSeasonalityPrices(seasonalityDetail)
        setToggle(true)
    }
      const clickShowDetail = (event: React.MouseEvent) => {
        event.preventDefault()
        if(seasonalityPrices === null){
            getDetailPrices()
            return
        }
        if(toggle){
            setToggle(false)
        }else{
            setToggle(true)
        }

    }
    return (
        <>
          {seasonalityPrices == null && !toggle? 
            <TableRow onClick={clickShowDetail}>
                <TableCell>{seasonalityName}</TableCell>
                <TableCell>詳細はクリックすると開きます</TableCell>
                <TableCell></TableCell>
            </TableRow>
            : seasonalityPrices == null && toggle ?
                <TableRow>
                    <TableCell>{seasonalityName}</TableCell>
                    <TableCell>詳細が取得できませんでした</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            : seasonalityPrices !== null && toggle ?
                seasonalityPrices.map(value => {
                    return (
                        <TableRow key={value.sesonalityPriceID}>
                            <TableCell>{seasonalityName}</TableCell>
                            <TableCell>{value.numberOfPeople}</TableCell>
                            <TableCell>{value.price}</TableCell>
                        </TableRow>
                    )
                })
            : <TableRow onClick={clickShowDetail}>
                <TableCell>{seasonalityName}</TableCell>
                <TableCell>詳細はクリックすると開きます</TableCell>
                <TableCell></TableCell>
            </TableRow>

            }
                
        </>
    )
}