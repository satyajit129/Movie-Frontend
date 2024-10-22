
import React from 'react';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import Button from '../button/Button';

const MovieCard = props => {
    // console.log(props);
    const item  = props.item;

    const bg = item.thumb_image_url || item.slider_image_url ;

    const link = `/movie-details/${item.id}`;

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{item.name}</h3>
        </Link>
    );
}

export default MovieCard;
