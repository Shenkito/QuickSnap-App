import { Route, Routes } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'

import Home from './pages/Home/Home'
import Add from './pages/Add/Add'

import Footer from './components/Footer/Footer'

import './App.css'


function App() {

    return (
        <div className="main-div">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Add />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
