
type HeaderProps = {
    userName: string;
    logout: () => void;
    gotoHome: () => void;
};

export const Header = ({ userName ,logout,gotoHome}: HeaderProps) => {

    const handlerLogout = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        logout()
    }

    const gotoTop = (event:React.MouseEvent) =>{
        event.preventDefault()
        gotoHome()
    }
    return (
        <header className="bg-white shadow w-full">
            <form onSubmit={handlerLogout}>
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-wrap justify-around">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My App</h1>
                        <p className="text-lg text-gray-600">Welcome, {userName}!</p>
                    </div>
                    <div className="flex gap-3">
                         <button className="text-[clamp(1rem,1.5vw,2rem)] text-gray-500 bg-cyan-500 
                        text-white rounded-xl h-10 self-center px-5 border border-solid border-cyan-500
                        hover:bg-white hover:text-black cursor-pointer" type="submit">ログアウトする</button>
                        <button className="text-[clamp(1rem,1.5vw,2rem)] text-gray-500 bg-cyan-500 
                        text-white rounded-xl h-10 self-center px-5 border border-solid border-cyan-500
                        hover:bg-white hover:text-black cursor-pointer" onClick={gotoTop}>トップへ戻る</button>
                    </div>
                   
                </div>
            </form>
        </header>
    );
}