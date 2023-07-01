import React, { useRef, useState } from "react";
import classes from './SearchForm.module.css';
import SearchIcon from "../Navbar/SearchIcon";
import ResultList from "./ResultList";

const SearchForm = props => {
  const [keyWord, setKeyWord] = useState(null);
  const [hasError, setHasError] = useState(false);
  const textInput = useRef();

  const submissionHandler = (e) => {
    e.preventDefault();
    // console.log(textInput.current.value);
    if (textInput.current.value.trim() === '') {
      setKeyWord(null);
      setHasError(true);
    }
    else {
      setKeyWord(textInput.current.value);
      setHasError(false);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.searchform} onSubmit={submissionHandler}>
        <div className={classes.header}>
          <input type="text" ref={textInput} />
          <SearchIcon />
        </div>
        <hr></hr>
        <div className={classes.btn}>
          <button type="button">Reset</button>
          <button className={classes.active}>Search</button>
        </div>
      </form>
      {keyWord && <ResultList key_word={keyWord} />}
      {hasError && <p className={classes.error}>Please enter the keyword</p>}
    </React.Fragment>
  );
};

export default SearchForm;