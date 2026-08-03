import { getGenderLabel, type Reservation } from "@/page/Reservation"
import { useState } from "react"
import { Table,
    TableHeader,
        TableHead,
        TableBody,
        TableRow,
        TableCell
 } from "@/components/ui/table"

 import { DEFAULT_DATE_FORMAT } from "@/utils/formatter"

type ReservationProperty = {
    isLoading: boolean,
    errorMessage: string,
    reservations: Reservation[]
}


export const ReservationInfos = (reservation: Reservation) =>{
    const [toggleOn,setToggleOn] = useState<Boolean>(false)
    const HandleToggleon = (event: React.MouseEvent) => {
        event.preventDefault()
        setToggleOn(true)
    }
    const HandleToggleOff = (event: React.MouseEvent) =>{
        event.preventDefault()
        setToggleOn(false)
    }
    const formatter = DEFAULT_DATE_FORMAT

        return (
                <>
                {toggleOn ? 
                   reservation.Guests.map(value => {
                    return (
                        <TableRow className="hover:cursor-pointer" onClick={HandleToggleOff}>
                            <TableCell className="py-6" font-medium>
                                {value.GuestName}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestAge ?? "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestSex ? getGenderLabel(value.GuestSex) : "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestFrom ?? "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkin == null ? "未定" : formatter.format(new Date(value.Checkin))}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkout == null ? "未定" : formatter.format(new Date(value.Checkout))}
                            </TableCell>
                            <TableCell>
                                {value.Room.RoomName}
                            </TableCell>
                        </TableRow>
                    )
                   })
                : <TableRow className="hover:cursor-pointer" onClick={HandleToggleon}>
                    <TableCell className="py-6" font-medium>
                        {reservation.RepresentGuest.GuestName}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.GuestAge ?? "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.GuestSex ? getGenderLabel(reservation.RepresentGuest.GuestSex) : "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.GuestFrom ?? "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.Checkin == null ? "未定" : formatter.format(new Date(reservation.RepresentGuest.Checkin))}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.Checkout == null ? "未定" : formatter.format(new Date(reservation.RepresentGuest.Checkout))}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.Room.RoomName}
                    </TableCell>
                </TableRow>}
                
               
                </>
                )

}



export const ReservationLists = ({isLoading,errorMessage,reservations}: ReservationProperty) => {
    return(
        <>
            {isLoading ? <p>しばらくお待ちください</p> : errorMessage != "" ? <h1>{errorMessage}</h1> :
                <Table>
                    <TableHeader>
                        <TableHead className="py-6" font-large>
                            宿泊者氏名
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者年齢
                        </TableHead>
                        <TableHead className="py-6" font-large>                            宿泊者性別
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者出身
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者チェックイン予定日
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者チェックアウト予定日
                        </TableHead>
                        <TableHead>
                            宿泊者部屋名称
                        </TableHead>
                    </TableHeader>
                    <TableBody>
                        {reservations.map(value =>{
                            return (
                                <ReservationInfos  RepresentGuest={value.RepresentGuest} Guests={value.Guests} ReservationID={value.ReservationID} />
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </>
        
    )
}

