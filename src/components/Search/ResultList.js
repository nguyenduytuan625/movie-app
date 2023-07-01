import React, { useState, useEffect } from "react";
import classes from './ResultList.module.css';
import useFetch from "../../hooks/use-fetch";
import Movie from "../Movies/Movie";
import MovieDetail from "../Movies/MovieDetail";

const ResultList = props => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [showing, setShowing] = useState(true);
  const [showingId, setShowingId] = useState(null);

  const { isLoading, error, reqFetch } = useFetch();
  useEffect(() => {
    const reqConfig = {
      url: `https://api.themoviedb.org/3/search/movie?query=${props['key_word']}&language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2Q1OThmY2IwMGYwODk0MDhiZDMyMjYwOWRjZTA5OCIsInN1YiI6IjY0OGQyNGFlMjYzNDYyMDBjYTE5YTE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I9qRahhLaQCp3aYlphPHZpRqdsoaNJrN57B-2ZS0DeU'
      }
    };
    const applyData = data => {
      setMovies(data.results);
    };
    reqFetch(reqConfig, applyData);
  }, [props, reqFetch]);

  const showHandler = id => {
    const clickedMovie = movies.find(item => item.id === id);
    console.log(clickedMovie);
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
      <ul className={classes.resultlist}>
        {movies.map(item =>
          <Movie key={item.id} id={item.id} poster_path={item['poster_path']} original_name={item['original_name']}
            allow_class={item.id === showingId} onShow={showHandler} onClose={closeHandler} />)}
      </ul>
      {showing && movie && <MovieDetail movie={movie} />}
    </React.Fragment>;
  }
  return (
    <React.Fragment>
      <h2 className={classes.title}>Search Results</h2>
      {content}
    </React.Fragment>
  );
};

export default ResultList;