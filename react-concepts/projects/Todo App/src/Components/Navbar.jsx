import React from 'react'
import { useState, useRef } from 'react';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = ({ showsidebar }) => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className='Navbar w-full  gap-5 bg-light-bg dark:bg-dark-bg flex items-center justify-center .toggletheme'>
            <div className="left flex-[5%]">
                <div className="hamburgercontainer  hamburgerbtn cursor-pointer  flex items-center justify-center" onClick={showsidebar}>
                    <RxHamburgerMenu className='w-7 h-7' />
                </div>
            </div>
            <div className="middle flex-[90%] justify-items-center ">
                <div className="logo-container w-30  h-30  border-zinc-950 flex items-center justify-center ">
                    <img className='w-full h-full object-contain' src={darkMode ? "src/assets/Tail Task dark.png" : "src/assets/Tail Task.png"} alt="logo" />
                </div>
            </div>
            <div className="right flex-[5%] justify-items-center cursor-pointer  ">
                <div className="theme ">
                    {darkMode ? (
                        <MdLightMode className='w-8 h-8 hover:text-light-primary' onClick={toggleTheme} />
                    ) : (
                        <MdDarkMode className='w-8 h-8 hover:text-blue-700' onClick={toggleTheme} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
