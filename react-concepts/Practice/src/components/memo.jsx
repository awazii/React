import React  from 'react'
import Callback from './callback.jsx'
import { useMemo,useState ,useEffect , useCallback ,useContext} from 'react';
const Memo = () => {
    const [value, setvalue] = useState(0)
    const [larger, setlarger] = useState([])
    const [searchvalue, setsearchvalue] = useState("")
    const [count, setcount] = useState(0)
    const [val1, setval1] = useState(0)
  const factorial = useMemo(() => {
  const compute = (n) => (n === 0 ? 1 : n * compute(n - 1));
  return compute(value);
}, [value]);
 const filtered = useMemo(()=>{
        return larger.filter(item=>item.toString().includes(searchvalue))
 },[larger,searchvalue])
 function arr(value) {
    return Array(value).fill().map((_,i)=>` item ${i} `)
 }
 useEffect(() => {
   if (count%2===0) {
    setlarger(arr(count*10))
   }
 }, [count])
  const randomfruit=useCallback(()=>{
    const fruits =["apple","banana","orange","mango"]
    return fruits[Math.floor(Math.random()*fruits.length)]
  },[])
  return (
    <div>
      <Callback  randomfruit={randomfruit} factorial={factorial} val1={val1} setval1={setval1} />
      <p>Factorial of {value} is: {factorial}</p>
      <input type="number" value={value} onChange={(e)=>{
       setvalue(Math.max(0,e.target.value))
      }}  className='border ' />
          <button onClick={()=>{ setcount(count+1)
      }} className='border py-1 px-4 rounded-md mx-4'>{count}</button>
      <input type="text" value={searchvalue} onChange={(e)=>{setsearchvalue(e.target.value)
      }} className='border ' />
     <p className="text-sm w-full h-full  border">
  Array length: {larger.length} {`Search value is ${filtered}`}
</p>
    </div>
  )
}

export default Memo
