import {useState,useEffect} from 'react'
 function useWindowArea(){
    const [Height, setHeight] = useState(window.innerHeight)
    const [Width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        const Handleresize=()=>{
            setHeight(window.innerHeight)
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize",Handleresize)
        return ()=>{
            window.removeEventListener("resize",Handleresize)
        }
    },[])
   return {Height,Width}
 }
const Custom = () => {
    const {Height:H,Width:W}=useWindowArea();
  return (
    <div>
      <h1>{H} is the height of the window</h1>
      <h1>{W} is the width of the window</h1>
       {W < 600 ? <p>📱 Mobile View</p> : <p>💻 Desktop View</p>}
    </div>
  )
}

export default Custom
