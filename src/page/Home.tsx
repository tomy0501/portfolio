import { Header } from '../components/Header';
import { Dashboard } from '../components/DashBoard';

export const Home = (userName: string) => {
    return (
        <div>
            <Header userName={userName} />
            <Dashboard />
        </div>
    )
}