import { Header } from '../components/Header';
import { Dashboard } from '../components/DashBoard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

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
                        <Header userName={userName} />
                        <Dashboard />
                    </div>
                )
    }catch(error:any){
        console.error("cannot create auth",error)
        return (
            <Navigate to="/login" replace/>
        )
    }
   
}