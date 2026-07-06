import React, { createContext,useContext,useState,useEffect} from 'react'

import { jwtDecode } from 'jwt-decode'
import type { MyCustomeClaims } from '../type/auth'
import { api,injectLogoutHandler } from '../utils/api'
import { useNavigate,useLocation } from 'react-router-dom'

interface AuthContextType {
    userName: string;
    role: string;
    loading: boolean;
    login: (accessToken: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType|null>(null);


export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userName,setUserName] = useState<string>('')
    const [role,setRole] = useState<string>('')
    const [loading,setLoading] = useState<boolean>(true)
    const location = useLocation();
    const navigate = useNavigate();
    const login = (accessToken: string) =>{
        try{
            const decoded = jwtDecode<MyCustomeClaims>(accessToken)
            console.log(decoded)
            if(decoded.username === "" || decoded.role === ""){
                throw new Error("ユーザー名とメールアドレスが取得できませんでした。")
            }
            setUserName(decoded.username)
            setRole(decoded.role)
        }catch(error)
        {
            console.error("JWTのデコードに失敗しました",error)
        }
    }
    const logout = () => {
        setUserName('')
        setRole('')
        navigate("/login")
    }

    useEffect(() =>{
        const restoreSession = async () => {
            if (location.pathname === "/login"){
                setLoading(false);
                return;
            }
            injectLogoutHandler(logout);
            try{
                const response = await api.post<{accessToken:string}>('/auth/refresh');
                login(response.data.accessToken)
            }catch(error){
                logout()
            }finally{
                setLoading(true);
            }
        }
        restoreSession();
    },[])

    if(loading){
        return  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>読み込み中...</div>;
    }
    return (
        <AuthContext.Provider value={{userName,role,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('authProviderの設定に失敗しました。');
    }
    return context;
}