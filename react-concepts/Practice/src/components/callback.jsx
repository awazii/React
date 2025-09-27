import React, { use } from 'react'
import { memo,useRef,forwardRef,useContext} from 'react'
 const  Outer=forwardRef((props,ref)=>{
     return <input className='border'  ref={ref} />
 })
const Callback = ({randomfruit,factorial,val1,setval1}) => {
  const userInputRef = useRef();
  console.log("component re-rendered")

  return (
    <div>
         <Outer ref={userInputRef} />
         <div className="btn-container flex gap-5 mt-5 ">
           <button className='border p-2 rounded-md' onClick={() => { alert(userInputRef.current.value) 
            setval1(val1+1)
           }}>Log Input</button>
           <button className='border p-2 rounded-md' onClick={() => { alert(randomfruit()) }}>Log Random Fruit</button>
         </div>
    </div>
  )
}

export default memo(Callback)
