import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Navigate,useNavigate } from 'react-router-dom';
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
        const navigate = useNavigate()
        const gotoHome = () => {
            navigate("/home")
        }
        return  ( 
                    <div className='w-full'>
                        <Header userName={userName} logout={userAuth.logout} gotoHome={gotoHome}/>
                        <div className="flex items-start justify-center m-auto min-h-screen bg-gray-100">
                            <Outlet/>
                        </div>
                    </div>
                )
    }catch(error:any){
        console.error("cannot create auth",error)
        return (
            <Navigate to="/login" replace/>
        )
    }
   
}