import type { Person } from "@/page/Customer"
import { Table,
        TableBody,
        TableHeader,
        TableCell,
        TableHead,
        TableRow
 } from "./ui/table"
type CustomerTableProperty = {
    isLoading:boolean,
    errorMessage:string,
    customers:Person[] | null
}

export const CustomerTable = ({isLoading,errorMessage,customers}:CustomerTableProperty) =>{
    if(isLoading){
        return <p>読み込み中…</p>
    }
    if(errorMessage){
        return <p>{errorMessage}</p>
    }
    if(!customers || customers.length === 0){
        return <p>顧客情報は存在しません。</p>
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>顧客名</TableHead>
                    <TableHead>顧客年齢</TableHead>
                    <TableHead>顧客性別</TableHead>
                    <TableHead>顧客出身</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {customers?.map((customer) => (
                    <TableRow key={customer.GuestID}>
                        <TableCell>{customer.GuestName}</TableCell>
                        <TableCell>{customer.GuestAge ?? "不明"}</TableCell>
                        <TableCell>{customer.GuestSex ?? "不明"}</TableCell>
                        <TableCell>{customer.GuestFrom ?? "不明"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};