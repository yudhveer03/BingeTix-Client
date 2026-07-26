import React from 'react'
import './CSS Files/TrailerSection.css'
const TrailerSection = ({ movie }) => {



    return (
      
        <>
            <div className='trailer-section'>
                
            <div className='trailer-vedio' onClick={() => window.open(movie.trailer)}>
                <h3>Trailer</h3>
                    <img src={movie.image} alt='Movie_image' height='250px' width='250' />
             
            </div>
            
                <div className='why-watch'>
                    <h3>Why Watch?</h3>
                {movie?.whyWatch?.map((item, index) => (
                    <div key={index} className='why-watch-details'>
                        <h1>{item.title}</h1>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
            </div>
        </>

    )
}
export default TrailerSection



