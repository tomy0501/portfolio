import { Table,
        TableBody,
        TableCell,
        TableRow
 } from './ui/table'
 import { CalenderHeader } from './CalenderBase'
 import type { RoomStocks,StockChangeMessage,} from '@/page/StockCalender'
 import { useState } from 'react'
import { DEFAULT_DATE_FORMAT } from '@/utils/formatter'

 
export const StockCalenderComponent = ({isLoading,errorMessage,calenderStocks,date,apiFunction,hotelID,roomTypeID}:{isLoading:boolean,errorMessage:string,calenderStocks:RoomStocks|null,date:Date,hotelID:string|undefined,roomTypeID:string|undefined,
        apiFunction:(changeDate:string,stock:number|null,reserved:number|null,stopSell:number|null,hotelID:string,roomTypeID:string) => Promise<StockChangeMessage>
}) => {
        if(isLoading){
                return (
                        <p>読み込み中</p>
                )
        }
        if(errorMessage !== ""){
                return (
                        <p>{errorMessage}</p>
                )
        }
        if(hotelID === undefined || roomTypeID === undefined){
                return <p>ホテルIDまたは部屋タイプIDが不正です。</p>
        }
        if(calenderStocks === null){
                return <p>カレンダーが読み込めませんでした。</p>
        }else{
                console.log(calenderStocks)
                const year = date.getFullYear()
                const month = date.getMonth()
                const totalDays = new Date(year,month + 1,0).getDate()

                const yearMonthDays = Array.from(
                        {length:totalDays},
                        (_,i) => {
                        return new Date(year,month,i + 1)
                        }
                )
                const week = []
                let nowDate = 0;
                const firstRow = <TableRow>
                        {
                                (function(){
                                        const firstRow = []
                                        const firstDate = yearMonthDays[0].getDay();
                                        for(let i =0; i< firstDate; i++){
                                                const cell = <TableCell></TableCell>
                                                firstRow.push(cell)
                                        }
                                        for(let j = firstDate; j < 7; j++){
                                                const calenderStock = calenderStocks.stock_data.filter(value => {
                                                        const formmattedSeasonalityDate = DEFAULT_DATE_FORMAT.format(new Date(value.date))
                                                        const formattedYearMonthDays = DEFAULT_DATE_FORMAT.format(new Date(yearMonthDays[nowDate]))
                                                        return formmattedSeasonalityDate === formattedYearMonthDays
                                                })
                                                if(calenderStock.length === 0){
                                                        const cell = <TableCell>
                                                                <div><p>{yearMonthDays[nowDate].getDate()}日</p>
                                                                <p>在庫がありません。</p>
                                                                </div>
                                                                </TableCell>
                                                        firstRow.push(cell)
                                                }else if(calenderStock.length === 1){
                                                        const cell = <StockDateCell apiFunction={apiFunction} 
                                                        stock={calenderStock[0].stock} reserve={calenderStock[0].reserved}
                                                        date={yearMonthDays[nowDate]} stopSel={calenderStock[0].stopSell} hotelID={hotelID} roomTypeID={roomTypeID}></StockDateCell>
                                                        firstRow.push(cell)
                                                }else{
                                                        const cell = <TableCell>
                                                                <div>
                                                                        <p>{yearMonthDays[nowDate].getDate()}日</p>
                                                                        <p>この日付の在庫データが不正です</p>
                                                                </div>          
                                                        </TableCell>
                                                        firstRow.push(cell)
                                                }
                                                nowDate++;
                                        }
                                        return firstRow
                                })()
                        }
                </TableRow>
                week.push(firstRow)
                while(nowDate < yearMonthDays.length){
                        const nextRow = <TableRow>
                                {
                                        (function(){
                                                const week = []
                                                for(let i = 0;i < 7; i++){
                                                        if(nowDate < yearMonthDays.length){
                                                                console.log(yearMonthDays[nowDate].toDateString())
                                                                const calenderStock = calenderStocks.stock_data.filter(value => {
                                                                        const formmattedSeasonalityDate = DEFAULT_DATE_FORMAT.format(new Date(value.date))
                                                                        const formattedYearMonthDays = DEFAULT_DATE_FORMAT.format(new Date(yearMonthDays[nowDate]))
                                                                        return formmattedSeasonalityDate === formattedYearMonthDays
                                                                })

                                                                if(calenderStock.length === 0){
                                                                        const cell = <TableCell>在庫がありません。</TableCell>
                                                                        week.push(cell)
                                                                }else if(calenderStock.length === 1){
                                                                        const cell = <StockDateCell apiFunction={apiFunction} 
                                                                        stock={calenderStock[0].stock} reserve={calenderStock[0].reserved}
                                                                        date={yearMonthDays[nowDate]} stopSel={calenderStock[0].stopSell} hotelID={hotelID} roomTypeID={roomTypeID}></StockDateCell>
                                                                        week.push(cell)
                                                                }else{
                                                                        const cell = <TableCell>
                                                                                <p>この日付の在庫データが不正です</p>
                                                                        </TableCell>
                                                                        week.push(cell)
                                                                }
                                                        }else{
                                                                const cell = <TableCell></TableCell>
                                                                week.push(cell)
                                                        }
                                                        nowDate++;
                                                }
                                                return week
                                        })()
                                }
                        </TableRow>
                        week.push(nextRow)
                      console.log(week)
                }
                return (
                        <Table>
                                <CalenderHeader></CalenderHeader>
                                <TableBody>
                                        {week}
                                </TableBody>
                        </Table>
                )
        }
        

 }

 export const StockDateCell = ({apiFunction,stock,reserve,stopSel,date,hotelID,roomTypeID}:
        {stock:number,reserve:number,stopSel:number,date:Date,hotelID:string,roomTypeID:string,
                apiFunction:(changeDate:string,stock:number|null,reserved:number|null,stopSell:number|null,hotelID:string,roomTypeID:string) => Promise<StockChangeMessage>}) =>{
                const [preStockNumber,setPreStockNumber] = useState<number>(stock)
                const [preReserveNumber,setPreReserveNumber] = useState<number>(reserve)
                const [preStopSelNumber,setPreStopSelNumber] = useState<number>(stopSel)
                const [stockNumber,setStockNumber] = useState<number>(stock)
                const [reserveNumber,setReserveNumber] = useState<number>(reserve)
                const [stopSelNumber,setStopSelNumber] = useState<number>(stopSel)
                const postNewStock = (event:React.MouseEvent) =>{
                        event.preventDefault()
                        if(hotelID === undefined || roomTypeID === undefined){
                                alert("ホテルIDまたは部屋タイプIDが不正です。")
                                return
                        }
                        if(preStockNumber === stockNumber && preReserveNumber === reserveNumber && preStopSelNumber === stopSelNumber){
                                alert("在庫数、予約数、売り止め数に変更がありません。")
                                return
                        }
                        apiFunction(DEFAULT_DATE_FORMAT.format(date),stockNumber,reserveNumber,stopSelNumber,hotelID,roomTypeID).then((result) =>{
                                setPreStockNumber(stockNumber)
                                setPreReserveNumber(reserveNumber)
                                setPreStopSelNumber(stopSelNumber)
                        }).catch((error) =>{
                                console.error(error)
                                alert("在庫変更に失敗しました。")
                        })
                        
                }
                return(
                        <TableCell className=''>
                                <div className='flex justify-center flex-col gap-2'>
                                        <p>{date.getDate()}日</p>
                                <label >
                                        在庫数
                                        <input className="w-10" type='number' value={stockNumber} onChange={(event) => {
                                                event.preventDefault()
                                                const newStockNumber = Number(event.target.value)
                                                setStockNumber(newStockNumber)
                                        }}></input>
                                </label>
                                <label>
                                        予約数
                                        <input className="w-10" type='number' value={reserveNumber} onChange={(event) =>{
                                                event.preventDefault()
                                                const newReserveNumber = Number(event.target.value)
                                                setReserveNumber(newReserveNumber)
                                        }}></input>
                                </label>
                                <label>
                                        売り止め数
                                        <input className="w-10" type='number' value={stopSelNumber} onChange={(event) =>{
                                                event.preventDefault()
                                                const newStopSelNumber = Number(event.target.value)
                                                setStopSelNumber(newStopSelNumber)
                                        }}></input>
                                </label>
                                </div>
                                <button className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded" onClick={postNewStock}>変更する</button>
                        </TableCell>
                )
        }