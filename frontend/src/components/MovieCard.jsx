
import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

function MovieCard({ movie }) {
  const imageUrl = `/images/${movie.id}.jpg`;
  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
        <div className="movie-card-image-container">
          <img src={imageUrl} alt={movie.title} className="movie-card-image" />
        </div>
        <div className="movie-card-content">
          <h3 className="movie-card-title">{movie.title}</h3>
          <p className="movie-card-genre">{movie.genre || "Жанр не указан"}</p>

        </div>
      </div>
    </Link>
  );
}

export default MovieCard;