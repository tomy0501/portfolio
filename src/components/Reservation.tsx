import { getGenderLabel, type Reservation } from "@/page/Hotel"
import { useState } from "react"
import { Table,
    TableHeader,
        TableHead,
        TableBody,
        TableRow,
        TableCell
 } from "@/components/ui/table"

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
    const formatter = new Intl.DateTimeFormat("ja-JP",
        {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }
    )

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
                                {value.GuestAge.Valid ? value.GuestAge.Int16.toString() : "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestSex.Valid ? getGenderLabel(value.GuestSex.String) : "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestFrom.Valid ? value.GuestFrom.String : "不明"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkin.Valid ? formatter.format(new Date(value.Checkin.String)): "未定"}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkout.Valid ? formatter.format(new Date(value.Checkout.String)) : "未定"}
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
                        {reservation.RepresentGuest.GuestAge.Valid ? reservation.RepresentGuest.GuestAge.Int16.toString() : "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.GuestSex.Valid ? getGenderLabel(reservation.RepresentGuest.GuestSex.String) : "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.GuestFrom.Valid ? reservation.RepresentGuest.GuestFrom.String : "不明"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.Checkin.Valid ? formatter.format(new Date(reservation.RepresentGuest.Checkin.String)) : "未定"}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.RepresentGuest.Checkout.Valid ? formatter.format(new Date(reservation.RepresentGuest.Checkout.String)) : "未定"}
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
        <div className="flex items-start justify-center m-auto min-h-screen bg-gray-100">
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
        </div>
        
    )
}

