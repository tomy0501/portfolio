import React, { createContext,useContext,useState } from 'react'

import { jwtDecode } from 'jwt-decode'
import type { MyCustomeClaims } from '../type/auth'

interface AuthContextType {
    userName: string;
    role: string;
    login: (accessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType|null>(null);


export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) => {
    const [userName,setUserName] = useState<string>('')
    const [role,setRole] = useState<string>('')
    const login = (accessToken: string) =>{
        try{
            const decoded = jwtDecode<MyCustomeClaims>(accessToken)
            setUserName(decoded.name)
            setRole(decoded.roles)
        }catch(error)
        {
            console.error("JWTのデコードに失敗しました",error)
        }
    }
    const logout = () => {
        setUserName('')
        setRole('')
    }
    return (
        <AuthContext.Provider value={{userName,role,login,logout}}>
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