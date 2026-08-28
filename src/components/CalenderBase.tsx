import type { CalenderPrice} from '@/page/RoomPrices'
import { useState } from 'react'
import { Table,
        TableBody,
        TableCell,
        TableHead,
        TableHeader,
        TableRow
 } from './ui/table'


export const CalenderHeader = () => {
    return (
    <TableHeader>
        <TableRow>
            <TableHead>日</TableHead>
            <TableHead>月</TableHead>
            <TableHead>火</TableHead>
            <TableHead>水</TableHead>
            <TableHead>木</TableHead>
            <TableHead>金</TableHead>
            <TableHead>土</TableHead>
        </TableRow>
    </TableHeader>
    )
}




export const DatePriceCalendar = ({calenderPrices,errorMessage,isLoading}:{ calenderPrices:CalenderPrice[]|null,errorMessage:string,isLoading:boolean}) => {
    if(isLoading){
        return <p>読み込み中</p>
    }
    if(errorMessage !== ""){
        return <p>{errorMessage}</p>
    }
    if(!calenderPrices || calenderPrices.length === 0){
        return <TableRow><TableCell>カレンダーが存在しません</TableCell></TableRow>
    }
    const tempDate = [...calenderPrices]
    const firstDate = tempDate[0].day.getDay()
    const weeks = []
    let i = 0;
    const firstRow = <TableRow>
            {
                (function(){
                    const cells = []
                    let j = 0
                    for(j; j < firstDate; j++){
                        const cell = <TableCell></TableCell>
                        cells.push(cell)
                    }
                    for(j;j < 7;j++){
                        const cell = <DatePriceCell calenderPrices={tempDate[i]}/>
                        cells.push(cell)
                        i++;
                    }
                    return cells
                })()
            }
        </TableRow>
    weeks.push(firstRow)
    while(i < tempDate.length){
        
        const nextRows = <TableRow>
            {
                (function(){
                    const rows = []
                    for(let k = 0; k < 7; k++){
                        console.log(i)
                        if(i >= tempDate.length){
                            const cell = <TableCell></TableCell>
                            rows.push(cell)
                        }else{
                            const cell = <DatePriceCell calenderPrices={tempDate[i]}/>
                            rows.push(cell);
                            i++;
                        }
                       
                    }
                    return rows
                })()
            }
        </TableRow>
        weeks.push(nextRows)
    }
    
    return (
        <Table>
            <CalenderHeader/>
            <TableBody>
                {weeks}
            </TableBody>
        </Table>
    )
}

export const DatePriceCell  = ({calenderPrices}:{calenderPrices:CalenderPrice}) => {
    const [toggle,setToggle] = useState<boolean>(false)
    const mouseClickEvent = (event:React.MouseEvent) =>{
        event.preventDefault()
        if(toggle){
            setToggle(false)
        }else{
            setToggle(true)
        }
    }
    return(
        <TableCell>
            <p>{calenderPrices.day.getDate()}日</p>
            {calenderPrices.seasonality.length === 0 ? <p>値段が設定されてません</p>:
            <ul onClick={mouseClickEvent}>{toggle ? calenderPrices.seasonality.map(value => {
                    return (
                        <li>{value.numberOfPeople}人 : {value.price}</li>
                    )
                }) : <li>押すと開きます</li> }
                
            </ul>
        }
        </TableCell>
    )
}