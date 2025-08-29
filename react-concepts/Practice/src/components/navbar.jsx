import "../styles/navbar.css"
import { useRef } from 'react'
import { NavLink } from "react-router-dom"
const Navbar = () => {
const multiref = useRef([])
function multirefhander(el,i) {
  multiref.current[i]=el;
  console.log(multiref.current)
}
  return (
    <>
      <nav className="navbar">
        <ul>
          {/* <li ref={(el)=>multirefhander(el,0)}>Home</li>
          <li ref={(el)=>multirefhander(el,1)}>About</li>
          <li ref={(el)=>multirefhander(el,2)}>Contact</li> */}
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/">Home</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/login">Login</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/container">Container</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/memo">Memo</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/focustracker">Focustracker</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/editable">Editable</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/tasklist">TaskList</NavLink></li>
          <li><NavLink className={(e)=>{return e.isActive ? "active":""}} to="/renderapi">RenderAPI</NavLink></li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar
