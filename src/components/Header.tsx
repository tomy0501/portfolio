
type HeaderProps = {
    userName: string;
};

export const Header = ({ userName }: HeaderProps) => {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">My App</h1>
                <p className="text-lg text-gray-600">Welcome, {userName}!</p>
            </div>
        </header>
    );
}