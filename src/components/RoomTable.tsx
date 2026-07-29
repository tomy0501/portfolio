import { type Room } from "@/page/Reservation"
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
    gotoRoomDetail: (roomID:string) => void
}


export const RoomTable = ({isLoading,errorMessage,rooms,gotoRoomDetail}:RoomTableProperty) =>{
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rooms.map(value => {
                        return (
                            <TableRow onClick={() =>{
                                gotoRoomDetail(value.RoomID)
                            }}>
                                <TableCell>{value.RoomName}</TableCell>
                                <TableCell>{value.RoomType}</TableCell>
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