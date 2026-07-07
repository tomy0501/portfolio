
type HeaderProps = {
    userName: string;
    logout: () => void;
};

export const Header = ({ userName ,logout}: HeaderProps) => {

    const handlerLogout = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        logout()
    }
    return (
        <header className="bg-white shadow w-full">
            <form onSubmit={handlerLogout}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-around">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My App</h1>
                        <p className="text-lg text-gray-600">Welcome, {userName}!</p>
                    </div>
                    <button className="text-lg text-gray-500 bg-cyan-500 text-white rounded-xl h-10 self-center px-5" type="submit">ログアウトする</button>
                </div>
            </form>
        </header>
    );
}