import React from 'react'
import { useState, createContext, useEffect } from 'react'
import { auth } from '../App'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './Footer.jsx'
const Main = () => {
    const [info, setinfo] = useState("I can change that")
    const [user, setuser] = useState("No user logged in yet!")
    useEffect(() => {
        console.log("info changed")
    }, [info])
    const authvalue = {
        user, login() {
            setuser("Awazii logged in !")
        }, logout() {
            setuser("No user logged in yet!")
        }
    }
    return (
        <auth.Provider value={{ authvalue, setuser, user, info, setinfo }}>
            <div className="wrapper min-h-screen flex flex-col">
                <div className="main flex-1">
                    <Navbar />
                    <Outlet />
                </div>
                <Footer />
            </div>
        </auth.Provider>
    )
}

export default Main
