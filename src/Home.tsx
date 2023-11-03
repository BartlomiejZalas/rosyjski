import rusFlag from './assets/ros.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <img src={rusFlag} className="logo" alt="Vite logo"/>
            </div>
            <h1>Nauka Rosyjskiego</h1>
            <div>
                <button onClick={() => navigate('/slowka')}>Słówka</button>
            </div>
            <div>
                <button onClick={() => navigate('/odmiana')}>Odmiana</button>
            </div>
        </>
    )
}
