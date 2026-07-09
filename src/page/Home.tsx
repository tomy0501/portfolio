import { Header } from '@/components/Header';
import { Dashboard } from '@/components/DashBoard';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { api } from '@/utils/api';
import type { Hotel } from '@/type/hotel'
import { useEffect,useState } from 'react';

export const Home = () => {
    try{
        const userAuth = useAuth()
        const userName = userAuth.userName
        const [hotels, setHotels] = useState<Hotel[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>('');
        useEffect(() =>{
            const fetchHotel = async () =>{

                setError('')

                try{
                    const response = await api.get<Hotel[]>('/api/facility')
                    setHotels(response.data)
                }catch(error:any){
                   setError(error)
                }finally{
                    setLoading(false)
                }
            }
            fetchHotel()
        })
        if (userName === ""){
            return (
                <Navigate to="/login" replace/>
            )
        }
        return  ( 
                    <div className='w-full'>
                        <Header userName={userName} logout={userAuth.logout} />
                        <Dashboard isLoading={loading} hotels={hotels} errorMessage={error}/>
                    </div>
                )
    }catch(error:any){
        console.error("cannot create auth",error)
        return (
            <Navigate to="/login" replace/>
        )
    }
   
}