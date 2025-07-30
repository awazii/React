import "../styles/navbar.css"
import { useState, useEffect, useRef } from 'react'
import styles from "../styles/practice.module.css"
const Navbar = (props) => {
  const [index, setIndex] = useState(0);
  const [counter, setcount] = useState(0);
  const [sec, setsec] = useState(0);
  const prevCount = useRef();
  const [isOnline, setonline] = useState(false)
  const timer = useRef()
  const changeinfo = () => {
    const strings = [
      "Told you !!",
      "You clicked again!",
      "Keep going 💪",
      "Last one?",
      "Nevermind, click more 😆",
      "I can change that"
    ];
    console.log(index)
    const currentString = strings[index];
    props.setInfo(currentString)
    const nextIndex = (index + 1) % strings.length;
    setIndex(nextIndex)
  }
  function start() {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current=null
    }
    timer.current = setInterval(() => {
      setsec(prevsec=> prevsec + 1)
    }, 1000)
  }
  function Stop() {
    clearInterval(timer.current)
    timer.current = null
  }
  useEffect(() => {
    prevCount.current = counter;
  }, [counter]);
  useEffect(() => {
    document.title = `${counter} Times Clicked !`
  }, [counter])
  useEffect(() => {
    function handleonline() {
      setonline(true)
      console.log("we are online")
    }
    function handleoffline() {
      setonline(false)
      console.log("we are offline")
    }
    setonline(navigator.onLine);
    console.log("entered")
    window.addEventListener("online", handleonline)
    window.addEventListener("offline", handleoffline)
    return () => {
      window.removeEventListener("online", handleonline)
      window.removeEventListener("offline", handleoffline)
    }
  }, [])
const multiref = useRef([])
function multirefhander(el,i) {
  multiref.current[i]=el;
  console.log(multiref.current)
}
  return (
    <>
      <nav className="navbar">
        <ul>
          <li ref={(el)=>multirefhander(el,0)}>Home</li>
          <li ref={(el)=>multirefhander(el,1)}>About</li>
          <li ref={(el)=>multirefhander(el,2)}>Contact</li>
        </ul>
      </nav>
      <div className="container">
        <h1 className="Title">This is my first React App</h1>
        <button onClick={changeinfo} className='Change'>Change Info</button>
      </div>
      <div className="counter">
        <h1>{counter} times Clicked</h1>
        <h2>{prevCount.current} prev count</h2>
        <button className="countbtn" onClick={() => {
          setcount(counter + 1)
        }}> Click</button>
      </div>
      <div>
        <h1>{isOnline ? "🟢 Online" : "🔴 Offline"}</h1>
      </div>
      <div className="timer">
        <p className="display">{`${sec} Seconds`}</p>
        <button onClick={start} className="start">Start</button>
        <button className={`${styles.marleft} stop`} onClick={Stop}>Stop</button>
      </div>
    </>
  )
}

export default Navbar
