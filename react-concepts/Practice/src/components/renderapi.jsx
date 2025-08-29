import React from 'react'
import { useLoaderData } from 'react-router-dom'
const Renderapi = () => {
  const data = useLoaderData();
  const Card = (props) => {
    return (
      <>
      <div className='card'>
        <h3 className="title" style={{ textAlign: 'left' }}>{`UserId : ${props.id}`}</h3>
        <h3 className="title">{props.title}</h3>
        <p className="artist">{props.body}</p>
      </div>
      </>
    )
  }
  return (
    <>
    <div className="grid-container">
      {data.map(item => (
        <Card key={item.id} {...item} />
      ))}
    </div>
    </>
  )
}

export default Renderapi
