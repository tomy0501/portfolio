import { Header } from '../components/Header';
import { Dashboard } from '../components/DashBoard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const Home = () => {
    const userAuth = useAuth()
    const userName = userAuth.userName
    if (userName === ""){
        return (
            <Navigate to="/" replace/>
        )
    }
    return (
        <div className='w-full'>
            <Header userName={userName} />
            <Dashboard />
        </div>
    )
}