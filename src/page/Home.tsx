import { Header } from '../components/Header';
import { Dashboard } from '../components/DashBoard';

export const Home = () => {
    const userName = "John Doe"; // Replace with actual user name logic
    return (
        <div>
            <Header userName={userName} />
            <Dashboard />
        </div>
    )
}