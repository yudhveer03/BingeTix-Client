import React from 'react'


const Show = ({show}) => {

  return (
    <div className="show-card">
      <h2>{show.theatre || 'Show'}</h2>
      <p>Date: {show.date || 'N/A'}</p>
      <p>Time: {show.time || 'N/A'}</p>
      <p>Price: ₹{show.price ?? 'N/A'}</p>
    </div>
  )
}

export default Show
