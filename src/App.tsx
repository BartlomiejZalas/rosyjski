import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { Layout } from './Layout';
import { Words } from './Words';
import { Conjugation } from './Conjugation';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="slowka" element={<Words/>}/>
                <Route path="odmiana" element={<Conjugation/>}/>
            </Route>
        </Routes>
    )
}

export default App
