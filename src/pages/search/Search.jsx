import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SearchForm from '../../components/Search/SearchForm';

const Search = () => {
	return (
		<div className='app'>
			<Navbar />
			<div style={{ height: '6rem' }}></div>
			<SearchForm />
		</div>
	);
};

export default Search;
