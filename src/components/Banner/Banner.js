import React, { useEffect, useState } from "react";
import classes from './Banner.module.css';
import useFetch from "../../hooks/use-fetch";

const Banner = (props) => {
  const [movie, setMovie] = useState(null);
  // console.log(props['req_url']);
  const { isLoading, error, reqFetch } = useFetch();
  // console.log(isLoading, error);

  useEffect(() => {
    const reqConfig = { url: props['req_url'] };
    const applyData = data => {
      // console.log(data.results);
      let index = Math.floor(Math.random() * data.results.length - 1);
      while (!data.results[index]) { index = Math.floor(Math.random() * data.results.length - 1); }
      setMovie(data.results[index]);
    };
    reqFetch(reqConfig, applyData);
  }, [props, reqFetch]);


  const imageErrorHandler = e => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://image.tmdb.org/t/p/original${movie['poster_path']}`;
    e.currentTarget.className = classes.poster;
    console.log('Poster Image');
  };

  let content;
  if (isLoading) { content = <p className={classes.loading}>Loading...</p>; }
  if (error) { content = <p className={classes.error}>Cannot fetch data!</p>; }
  if (movie) {
    content = <React.Fragment>
      <img src={`https://image.tmdb.org/t/p/original${movie['backdrop_path']}`} alt={movie['original_name']} onError={imageErrorHandler} />
      <div className={classes.info}>
        <h1>{movie['name']}</h1>
        <div className={classes['btn-action']}>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{movie.overview}</p>
      </div>
    </React.Fragment>;
  }

  return (
    <div className={classes.banner}>
      {content}
    </div>
  );
};

export default Banner;