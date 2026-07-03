import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

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
            navigate('/home');
        } catch (error) {
            setErrorMessage('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginForm isLoading={isLoading} errorMessage={errorMessage} onSubmit={handleLoginSubmit} />
    )
};
