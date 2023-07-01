import React, { useEffect, useState, useRef, useCallback } from 'react';
import SearchIcon from "./SearchIcon";
import classes from './Navbar.module.css';

const Navbar = props => {
  const prevScrollY = useRef(0);
  const [didScrollOut, setDidScrollOut] = useState(false);

  // Handling scroll down to 100px
  const handleScroll = useCallback(() => {
    const currScrollY = window.scrollY;
    if (currScrollY >= 100 && !didScrollOut) { setDidScrollOut(true); }
    if (currScrollY < 100 && didScrollOut) { setDidScrollOut(false); }
    prevScrollY.current = currScrollY;
  }, [didScrollOut]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <React.Fragment>
      <div className={`${classes.navbar} ${didScrollOut ? classes['bg-dark'] : ''}`}>
        <h2>Movie App</h2>
        <SearchIcon />
      </div>
    </React.Fragment>
  );
};

export default Navbar;
