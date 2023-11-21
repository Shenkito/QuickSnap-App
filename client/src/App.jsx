import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import NavBar from './components/nav-bar/NavBar'

import Home from './pages/Home/Home'
import Posts from './pages/Posts/Posts'
import Add from './pages/Add/Add'
import Login from './pages/Login/Login'

import Footer from './components/footer/Footer'

import './App.css'


function App() {
    const [auth, setAuth] = useState({});

    const loginSubmitHandler = (values) => {
        const updatedAuth = { ...auth, ...values};
        setAuth(updatedAuth);
        console.log(auth);
        console.log(updatedAuth);
    }

    return (
        <div className="main-div">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/add" element={<Add />} />
                <Route path="/login" element={<Login loginSubmitHandler={loginSubmitHandler} />} /> 
            </Routes>
            <Footer />
        </div>
    )
}

export default App
