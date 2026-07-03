import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginSubmit = async (email: string, password: string) => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await fetch('./auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }
        } catch (error) {
            setErrorMessage('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-[80%] min-w-[300px] min-h-screen bg-gray-100">
        <LoginForm isLoading={isLoading} errorMessage={errorMessage} onSubmit={handleLoginSubmit} />
        </div>
    )
};
