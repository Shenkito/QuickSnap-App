import { Route, Routes } from 'react-router-dom'

import NavBar from './components/main/NavBar'
import Footer from './components/main/Footer'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'

function App() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App