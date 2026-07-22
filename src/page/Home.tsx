import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';


export const Home = () => {
    try{
        const userAuth = useAuth()
        const userName = userAuth.userName
        if (userName === ""){
            return (
                <Navigate to="/login" replace/>
            )
        }
        return  ( 
                    <div className='w-full'>
                        <Header userName={userName} logout={userAuth.logout} />
                        <Outlet/>
                    </div>
                )
    }catch(error:any){
        console.error("cannot create auth",error)
        return (
            <Navigate to="/login" replace/>
        )
    }
   
}