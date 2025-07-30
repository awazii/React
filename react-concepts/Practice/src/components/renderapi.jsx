import React from 'react'

const Renderapi = (props) => {
  return (
    <div className='card'>
    <h3 className="title" style={{textAlign:'left'}}>{`UserId : ${props.id}`}</h3>
    <h3 className="title">{props.title}</h3>
      <p className="artist">{props.body}</p>
    </div>
  )
}

export default Renderapi
