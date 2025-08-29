import React from 'react'
import { useParams } from 'react-router-dom'
const Card = () => {
    const {id}=useParams();
  return (
    <div>
        <p>i am card {id}</p>
    </div>
  )
}

export default Card
