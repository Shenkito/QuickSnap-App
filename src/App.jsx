import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'

function App() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </>
    )
}

export default App