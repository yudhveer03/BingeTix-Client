import { useNavigate } from 'react-router-dom'
import './Movie_Card.css'




const Movie_Cards = ({ id,time, rating, genre, image, title }) => {

    const navigate = useNavigate();


    return (
        <>

            <div>

                <div className="card">

                    <img src={image} alt={title} />

                    <div className="card-text">
                        <h3>{title}</h3>
                        <p>⭐ {rating}</p>
                        <p>{genre}</p>
                        <p>{time}</p>
                        <button onClick={ ()=>navigate(`/movies/${id}`)}>Book Now</button>

                    </div>

                </div>
            </div>






        </>
    )
}



export default Movie_Cards