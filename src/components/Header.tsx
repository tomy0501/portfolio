import { useAuth } from "../context/AuthContext";

type HeaderProps = {
    userName: string;
};

export const Header = ({ userName }: HeaderProps) => {
    const auth = useAuth()
    const handlerLogout = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        auth.logout()
    }
    return (
        <header className="bg-white shadow w-full">
            <form onSubmit={handlerLogout}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">My App</h1>
                    <p className="text-lg text-gray-600">Welcome, {userName}!</p>
                    <button className="text-lg text-gray-500" type="submit">ログアウトする</button>
                </div>
            </form>
        </header>
    );
}