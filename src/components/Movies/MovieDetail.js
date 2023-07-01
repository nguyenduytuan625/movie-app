import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/use-fetch";
import YouTube from "react-youtube";
import classes from './MovieDetail.module.css';

const MovieDetail = props => {
  const [trailer, setTrailer] = useState(null);
  const { isLoading, error, reqFetch } = useFetch();
  useEffect(() => {
    const reqConfig = {
      url: `https://api.themoviedb.org/3/movie/${props.movie.id}/videos?`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2Q1OThmY2IwMGYwODk0MDhiZDMyMjYwOWRjZTA5OCIsInN1YiI6IjY0OGQyNGFlMjYzNDYyMDBjYTE5YTE1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I9qRahhLaQCp3aYlphPHZpRqdsoaNJrN57B-2ZS0DeU'
      }
    };
    const applyData = (data) => {
      let trailer = data.results.find(item => item.name === 'Official Trailer' && item.site === 'YouTube' && item.type === 'Trailer');
      if (!trailer) { trailer = data.results.find(item => item.name === 'Official Teaser' && item.site === 'YouTube' && item.type === 'Teaser'); }
      if (!trailer) { trailer = data.results.find(item => item.site === 'YouTube' && item.type === 'Trailer'); }
      if (!trailer) { trailer = data.results.find(item => item.site === 'YouTube' && item.type === 'Teaser'); }
      console.log(trailer);
      setTrailer(trailer);
    };
    reqFetch(reqConfig, applyData);
  }, [props, reqFetch]);

  const opts = {
    height: '400',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  const imageErrorHandler = e => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = `https://image.tmdb.org/t/p/original${props.movie['poster_path']}`;
    console.log('Poster Image');
  };

  let content;
  if (isLoading) { content = <p className={classes.loading}>Loading...</p>; }
  else {
    content = <React.Fragment>
      <div>
        <h2 className={classes['mb-1']}>{props.movie.title || props.movie.name}</h2>
        <hr className={classes['mb-1']}></hr>
        <p><b> Release Date: {props.movie['release_date']}</b></p>
        <p className={classes['mb-1']}><b> Vote: {props.movie['vote_average']} / 10</b></p>
        <p className={classes.overview}>{props.movie.overview}</p>
      </div>
      {(error || !trailer) && <img src={`https://image.tmdb.org/t/p/original${props.movie['backdrop_path']}`} alt={props.movie['original_name']} onError={imageErrorHandler} />}
      {!error && trailer && <YouTube videoId={trailer.key} opts={opts} />}
    </React.Fragment>;
  }

  return (
    <div className={classes.moviedetail}>
      {content}
    </div>
  );
};

export default MovieDetail;