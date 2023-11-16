import { Route, Routes } from 'react-router-dom'

import NavBar from './components/nav-bar/NavBar'

import Home from './pages/Home/Home'
import Posts from './pages/Posts/Posts'
import Add from './pages/Add/Add'

import Footer from './components/footer/Footer'

import './App.css'


function App() {

    return (
        <div className="main-div">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/posts' element={<Posts />} />
                <Route path="/add" element={<Add />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
