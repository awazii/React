import { cards } from '../data/cards'
import Cards from './cards.jsx'
import Renderapi from './renderapi.jsx'
import { useState, useEffect } from 'react'
import '../styles/grid.css'
const Grid = (props) => {
  //  useEffect(() => {
  //    console.log("i am from grid component")
  //  })
  const [data, setdata] = useState([])
  useEffect(() => {
   ( async () => {
      let dommy = await fetch("https://jsonplaceholder.typicode.com/posts")
      let data = await dommy.json()
      setdata(data)
    })()
  }, [])

  return (
    <>
      <div className="grid-container">
        {!props.api ? cards.map(card => {
          return (
            <Cards
              id={card.id}
              key={card.id}
              title={card.title}
              artist={card.artist}
              img={card.img}
              change={props.info}
            />
          )
        }) : data.map(card=>{
             return(
              <Renderapi
              id={card.id}
              key={card.id}
              title={card.title}
              body={card.body}
              />
             )
        })}
      </div>
    </>
  )
}
export default Grid
