import type { Hotel } from "@/type/hotel"
import { Table,
        TableHead,
        TableBody,
        TableRow,
        TableCell
 } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";

type DashboardPropertys = {
    isLoading: boolean;
    hotels: Hotel[];
    errorMessage: string;
};

export const Dashboard = ({ isLoading,hotels,errorMessage} : DashboardPropertys) => {
    const navigate = useNavigate();
    const handleHotelClick = (hotelID: string) =>{
        navigate(`/hotels/${hotelID}`)
    }
    return (
        <div className="flex items-start justify-center m-auto min-h-screen bg-gray-100">
            {isLoading  ? 
            <h1 className="text-3xl font-bold text-orange">ロード中です…お待ちください</h1> :
            errorMessage !== "" ? <p>{errorMessage}</p>:
            <Table>
                <TableRow>
                    <TableHead>旅館名</TableHead>
                    <TableHead>住所</TableHead>
                    <TableHead>電話番号</TableHead>
                </TableRow>
                <TableBody>
                    {hotels.map(value =>{
                        return (
                        <TableRow onClick={() =>{
                            handleHotelClick(value.hotelID)
                        }}>
                            <TableCell>
                                {value.hotelName}
                            </TableCell>
                            <TableCell>
                                {value.address}
                            </TableCell>
                            <TableCell>
                                {value.phone}
                            </TableCell>
                        </TableRow>        
                    )
                    })}
                </TableBody>
            </Table>
            }
        </div>
    )
}