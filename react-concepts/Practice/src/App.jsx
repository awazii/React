import { useEffect, useState, useMemo,useCallback } from 'react'
import Inputs from "./components/inputs.jsx"
import './App.css'
import Navbar from './components/navbar.jsx'
import Grid from './components/grid.jsx'
import Footer from './components/Footer.jsx'
import Editable from './components/editable.jsx'
import TaskList from './components/Tasklist.jsx'
import FocusTracker from './components/focustracker.jsx'
import Memo from './components/memo.jsx'
function App() {
  const [info,setinfo] = useState("I can change that")
  useEffect(() => {
    console.log("Welcome to my first react page")
  }, [])
  useEffect(() => {
    console.log("i will be logged no matter what")
  })
  useEffect(() => {
   console.log("info changed")
  }, [info])
  return (
    <div className='w-full h-screen  '>
      {/* <Navbar setInfo={setinfo} />
      <Grid info={info} /> */}
      <FocusTracker />
      <Memo />
      {/* <Grid api={true} /> */}
      {/* <div className="Two">
      <Editable/>
      <Inputs/>
      </div> */}

      <TaskList />
      {/* <Footer /> */}
    </div>
  )
}

export default App
