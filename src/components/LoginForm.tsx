import { useState } from 'react';

type LoginFormProps = {
    onSubmit: (email: string, password: string) => void;
    isLoading?: boolean;
    errorMessage?: string;
};

export const LoginForm = ( { onSubmit, isLoading, errorMessage }: LoginFormProps ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(email, password);
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    メールアドレス
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    パスワード
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                />
            </div>
            {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={isLoading}
            >
                {isLoading ? 'ロード中...' : 'ログイン'}
            </button>
        </form>
    );
};