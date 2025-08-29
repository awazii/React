import React,{useState,useRef,useEffect} from 'react'
import styles from "../styles/practice.module.css"
const Container = () => {
      const [counter, setcount] = useState(0);
      const [sec, setsec] = useState(0);
      const prevCount = useRef();
      const [isOnline, setonline] = useState(false)
      const timer = useRef()
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
    useEffect(() => {
    prevCount.current = counter;
  }, [counter]);
  useEffect(() => {
    document.title = `${counter} Times Clicked !`
  }, [counter])
  return (
    <>
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

export default Container
