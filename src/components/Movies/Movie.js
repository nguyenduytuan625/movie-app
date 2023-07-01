import React, { } from "react";
import classes from './Movie.module.css';

const Movie = props => {
  const clickHandler = () => {
    if (!props['allow_class']) { props.onShow(props.id); }
    else { props.onClose(); }
  };

  return (
    <li onClick={clickHandler} className={`${classes.movie} ${props['allow_class'] ? classes.big : ''}`}>
      <img src={`https://image.tmdb.org/t/p/w92${props['poster_path']}`} alt={props['original_name']} />
    </li>
  );
};

export default Movie;