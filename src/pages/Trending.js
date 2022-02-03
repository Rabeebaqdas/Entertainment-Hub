import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/CustomPagination';
import SingleContent from '../components/SingleContent';
const Trending = () => {
    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    const [content, setcontent] = useState([]);
    const [page,setpage] = useState(1);
    useEffect(() => {
        const TrendingData = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`);
            const data = await response.json();
            setcontent(data.results);
        }
        TrendingData();
    }, [page])
    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    content && content.map((c) => (
                        <SingleContent key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c. vote_average}
                        />
                    ))
                }
            </div>
            <CustomPagination setpage={setpage} />
        </div>
    )
}

export default Trending;