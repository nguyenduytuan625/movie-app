import React, { useState } from "react";
import Navbar from '../../components/Navbar/Navbar';
import Banner from '../../components/Banner/Banner';
import MovieList from "../../components/Movies/MovieList";

const API_KEY = '27d598fcb00f089408bd322609dce098';
const requests = [
	{ url: `/discover/tv?api_key=${API_KEY}&with_network=123`, title: 'Nguyên bản' },
	{ url: `/trending/all/week?api_key=${API_KEY}&language=en-US`, title: 'Xu hướng' },
	{ url: `/movie/top_rated?api_key=${API_KEY}&language=en-US`, title: 'Xếp hạng cao' },
	{ url: `/discover/movie?api_key=${API_KEY}&with_genres=28`, title: 'Hành động' },
	{ url: `/discover/movie?api_key=${API_KEY}&with_genres=35`, title: 'Hài' },
	{ url: `/discover/movie?api_key=${API_KEY}&with_genres=27`, title: 'Kinh dị' },
	{ url: `/discover/movie?api_key=${API_KEY}&with_genres=10749`, title: 'Lãng mạn' },
	{ url: `/discover/movie?api_key=${API_KEY}&with_genres=99`, title: 'Tài liệu' },
];

function Browse() {
	const [showingTitle, setShowingTitle] = useState(null);

	const changeShowingTitleHandler = title => {
		setShowingTitle(title);
	};

	return (
		<div className="app">
			<Navbar />
			<Banner req_url={'https://api.themoviedb.org/3' + requests[0].url} />
			{requests.map(item =>
				<MovieList key={item.title} req_url={'https://api.themoviedb.org/3' + item.url} title={item.title} allow_show={showingTitle === item.title} onChangeShowingTitle={changeShowingTitleHandler} />)}

		</div>
	);
}

export default Browse;

