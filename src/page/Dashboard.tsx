import { useState,useEffect } from "react";
import type { Hotel } from "@/type/hotel"
import { api } from "@/utils/api";
import { Dashboard } from "@/components/DashBoard";

type apiMessage = {
    message: string,
    value: Hotel[]
}

export const DashboardLayout = () =>{
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    useEffect(() =>{
        const fetchHotel = async () =>{

            setError('')

            try{
                const response = await api.get<apiMessage>('/api/facility')
                setHotels(response.data.value)
            }catch(error:any){
                setError(error)
            }finally{
                setLoading(false)
            }
        }
        fetchHotel()
    },[])

    return (
        <Dashboard  isLoading={loading} hotels={hotels} errorMessage={error}/>
    )
}