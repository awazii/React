import { cards } from '../data/cards'
import Cards from './cards.jsx'
import { useState, useEffect,useContext } from 'react'
import { auth } from '../App'
import '../styles/grid.css'
const Grid = () => {
  const [data, setdata] = useState([])
   const [index, setIndex] = useState(0);
    const {setinfo,info }= useContext(auth);    
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
        setinfo(currentString)
        const nextIndex = (index + 1) % strings.length;
        setIndex(nextIndex)
      }
  return (
    <>
       <div className="container">
        <button onClick={changeinfo} className='Change'>Change Info</button>
      </div>
      <div className="grid-container">
       {cards.map(card => {
          return (
            <Cards
              id={card.id}
              key={card.id}
              title={card.title}
              artist={card.artist}
              img={card.img}
              change={info}
            />
          )
        })}
      </div>
    </>
  )
}
export default Grid
