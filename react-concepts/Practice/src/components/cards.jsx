import {useState,useRef,useEffect} from 'react'
import '../styles/cards.css'
import styles from "../styles/practice.module.css"
const Cards = (props) => {
const [islike, setlike] = useState(0)
const inputref = useRef()
useEffect(() => {
      console.log(`${islike?"you like this card":"you dislike this card"}`)
}, [islike])
 useEffect(() => {
       console.log("i am from card component")
       return ()=>{
        console.log("cleaning up....")
       }
     })
     function getfocused() {
              inputref.current.focus()
     }
     function lenghtchecker () {
      alert( inputref.current.value.length)
     }
  return (
    <div data-testid={`card-${props.id}`} className="card">
      <div className="Image-container">
        <img src={props.img} alt={props.title} />
      </div>
      <h3 className="title">{props.title}</h3>
      <p className="artist">{props.artist}</p>
      <p className="change">{props.change}</p>
      <div className="likebtn-container">
      <button onClick={ ()=>{ setlike( islike ? 0 :1)
              console.log(` card container is ${props.id}`)
    }} className='like'>{`${islike? "liked":"like"}`}</button>
      </div>
       <div className={`focuscontainer`}>
        <input ref={inputref} className={`${styles.focus_input}`} type="text" style={{margin:"20px"}}  placeholder='Write whatever you want'/>
            <button onClick={getfocused}>Click to focus</button>
            <button className={`${styles.marleft}`}   onClick={lenghtchecker}>Check length</button>
       </div>
    </div>
  )
}

export default Cards
 
