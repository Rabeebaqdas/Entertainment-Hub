import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/CustomPagination';
import Genres from '../components/Genres';
import SingleContent from '../components/SingleContent';
import useGenre from '../hooks/useGenre';

 const Series = () => {
    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    const [content, setcontent] = useState([]);
    const [page, setpage] = useState(1);
    const [numOfPages, setnumOfPages] = useState();
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([])
    const genreForURL = useGenre(selectedGenre);
    useEffect(() => {
        const movieData = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=pohttps://api.themoviedb.org/3/discover/movie?api_key=207aac95f4e37be89af8e3f27c5bd7bd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1pularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForURL}`)
            
            const data = await response.json();
            setcontent(data.results);
            setnumOfPages(data.total_pages);
        }
        movieData();
    }, [page,genreForURL])
    return (
        <div>
        <span className="pageTitle">tv series</span>
        <Genres 
        type="tv"
        genre = {genre}
        setGenre = {setGenre}
        selectedGenre = {selectedGenre}
        setSelectedGenre = {setSelectedGenre}
        setpage = {setpage}
         />
        <div className="trending">
            {
                content && content.map((c) => (
                    <SingleContent key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="tv"
                        vote_average={c.vote_average}
                    />
                ))
            }
        </div>
        {numOfPages > 1 &&
            <CustomPagination setpage={setpage} numOfPages={numOfPages} />
        }
    </div>
    )
}

export default Series;

