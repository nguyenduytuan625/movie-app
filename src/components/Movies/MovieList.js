import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import classes from './MovieList.module.css';
import Movie from "./Movie";
import MovieDetail from "./MovieDetail";

const MovieList = (props) => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showing, setShowing] = useState(true);
  const [showingId, setShowingId] = useState(null);

  const { isLoading, error, reqFetch } = useFetch();
  useEffect(() => {
    const reqConfig = { url: props['req_url'] };
    const applyData = data => {
      // console.log(data.results);
      setMovies(data.results);
    };
    reqFetch(reqConfig, applyData);
  }, [props, reqFetch]);

  const showHandler = id => {
    const clickedMovie = movies.find(item => item.id === id);
    console.log(clickedMovie);
    props.onChangeShowingTitle(props.title);
    setMovie(clickedMovie);
    setShowing(true);
    setShowingId(id);
  };
  const closeHandler = () => {
    setShowing(false);
    setShowingId(null);
  }

  let content;
  if (isLoading) { content = <p className={classes.loading}>Loading...</p>; }
  if (error) { content = <p className={classes.error}>Cannot fetch data!</p>; }
  if (movies.length > 0) {
    // console.log(showingId);
    content = <React.Fragment>
      <ul className={classes.movielist}>
        {movies.map(item =>
          <Movie key={item.id} id={item.id} poster_path={item['poster_path']} original_name={item['original_name']}
            allow_class={item.id === showingId && props['allow_show']} onShow={showHandler} onClose={closeHandler} />)}
      </ul>
      {props['allow_show'] && showing && <MovieDetail movie={movie} />}
    </React.Fragment>;
  }
  return (
    <React.Fragment>
      <h2 className={classes.title}>{props.title}</h2>
      {content}
    </React.Fragment>
  );
};

export default MovieList;