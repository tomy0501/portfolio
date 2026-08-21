import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CustomerTable } from "@/components/CustomerPage";
import type { Gender } from "./Reservation";
import { api } from "@/utils/api";

export type Person = {
    GuestID: string,
    GuestName: string,
    GuestAge: number | null,
    GuestSex: Gender | null,
    GuestFrom: string | null,
}

export const Customer = () => {
    const [customers, setCustomers] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const {hotelID} = useParams()
    useEffect(() => {
        const getAllCustomers = async () => {
            try {
                const data = await api.get<{ message: string; value: Person[] | null }>(`/api/allGuest/${hotelID}`);
                if (data.status !== 200) {
                    throw new Error("Cannot get customers");
                }
                if (data.data.value == null) {
                    setErrorMessage("顧客情報は存在しません。");
                } else {
                    setCustomers(data.data.value);
                }
            } catch (error) {
                setErrorMessage("顧客情報が取得できませんでした");
                console.log(error);
            } finally {
                setIsLoading(false);
            }  
        }
        getAllCustomers();
    }, []);
    return (
        <CustomerTable customers={customers} isLoading={isLoading} errorMessage={errorMessage} />
    )
};