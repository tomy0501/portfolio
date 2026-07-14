import type { Reservation } from "@/page/Hotel"
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
                                {value.GuestAge.toString()}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestSex}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.GuestFrom}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkin}
                            </TableCell>
                            <TableCell className="py-6" font-medium>
                                {value.Checkout}
                            </TableCell>
                        </TableRow>
                    )
                   })
                : <TableRow className="hover:cursor-pointer" onClick={HandleToggleon}>
                    <TableCell className="py-6" font-medium>
                        {reservation.representGuest.GuestName}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.representGuest.GuestAge.toString()}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.representGuest.GuestSex}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.representGuest.GuestFrom}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.representGuest.Checkin}
                    </TableCell>
                    <TableCell className="py-6 font-medium">
                        {reservation.representGuest.Checkout}
                    </TableCell>
                </TableRow>}
                
               
                </>
                )

}



export const ReservationLists = ({isLoading,errorMessage,reservations}: ReservationProperty) => {
    return(
        <div>
            {isLoading ? <p>しばらくお待ちください</p> : errorMessage != "" ? <h1>{errorMessage}</h1> :
                <Table>
                    <TableHeader>
                        <TableHead className="py-6" font-large>
                            宿泊者氏名
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者年齢
                        </TableHead>
                        <TableHead className="py-6" font-large>
                            宿泊者性別
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
                    </TableHeader>
                    <TableBody>
                        {reservations.map(value =>{
                            return (
                                <ReservationInfos  representGuest={value.representGuest} Guests={value.Guests} reservationID={value.reservationID} />
                            )
                        })}
                    </TableBody>
                </Table>
            }
        </div>
        
    )
}

