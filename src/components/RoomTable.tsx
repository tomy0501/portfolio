import { type Room } from "@/page/Room"
import { Table,
        TableBody,
        TableHeader,
        TableCell,
        TableHead,
        TableRow
 } from "./ui/table"


type RoomTableProperty = {
    isLoading:boolean,
    errorMessage:string,
    rooms:Room[] | null,
    checkSeasonality: (seasonalityID:string) => void
}


export const RoomTable = ({isLoading,errorMessage,rooms,checkSeasonality}:RoomTableProperty) =>{
    if(isLoading){
        return <p>読み込み中…</p>
    }

    return (
        <>
            {errorMessage !== "" ? <p>{errorMessage}</p>: rooms != null ?
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>部屋名</TableHead>
                        <TableHead>部屋タイプ名</TableHead>
                        <TableHead>シーズナリティ名</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rooms.map(value => {
                        return (
                            value.SeasonalityID !== null && value.SeasonalityName !== null ?
                            <TableRow key={value.RoomID} onClick={() =>{
                                checkSeasonality(value.SeasonalityID as string)
                            }}>
                                <TableCell>{value.RoomName}</TableCell>
                                <TableCell>{value.RoomType}</TableCell>
                                <TableCell>{value.SeasonalityName}</TableCell>
                            </TableRow>
                            :
                            <TableRow key={value.RoomID}>
                                <TableCell>{value.RoomName}</TableCell>
                                <TableCell>{value.RoomType}</TableCell>
                                <TableCell>未設定</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table> 
            : <p>部屋情報は存在しません。</p>
            }
        </>
    )
}