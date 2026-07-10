import { useState } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext'
import type { LoginMessage } from '@/type/auth';
import axios from 'axios';
import { useNavigate,Navigate } from 'react-router-dom';

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login,userName,role } = useAuth()
    const navigation = useNavigate();
    if (userName !== '' && role !== ''){
        return <Navigate to="/home"></Navigate>
    }
    const handleLoginSubmit = async (email: string, password: string) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = axios.post<LoginMessage>('/auth/login',{
                email:email,
                password:password
            })

            const token = (await response).data.accessToken;

            login(token)
            navigation("/home")
            
        } catch (error: any) {
            console.log(error.response)
            if (error.response && error.response.data){
                setErrorMessage(error.response.data)
            }else{
                setErrorMessage('通信に失敗しました。');
            }
            
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center m-auto w-[80%] min-w-[300px] min-h-screen bg-gray-100">
        <LoginForm isLoading={isLoading} errorMessage={errorMessage} onSubmit={handleLoginSubmit} />
        </div>
    )
};
