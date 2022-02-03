import { Chip } from '@material-ui/core';
import React, { useEffect } from 'react'

const Genres = ({ type, genre, setGenre, selectedGenre, setSelectedGenre, setpage }) => {
    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    useEffect(() => {
        const genreData = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${REACT_APP_API_KEY}&language=en-US`)
            const data = await response.json();
            setGenre(data.genres);
        }
        genreData();

        return () => {
            setGenre({});
        }

    }, [])

    const handleAdd = (c) => {
        setSelectedGenre([...selectedGenre, c]);
        setGenre(genre.filter((g)=>g.id !== c.id));
        setpage(1);
    }

    const handleRemove = (c) => {
        setGenre([...genre,c]);
        setSelectedGenre(selectedGenre.filter((g)=>g.id !== c.id));
        setpage(1);
    }

    return (
        <div style={{ padding: "6px 0" }}>
             {selectedGenre && selectedGenre.map((c) => (
                <Chip label={c.name}
                size="small"
                color="primary"
                style={{ margin: 2 }}
                key = {c.id}
                clickable
                onDelete={()=>handleRemove(c)}
                />
            ))}
            {genre && genre.map((c) => (
                <Chip label={c.name}
                size="small"
                style={{ margin: 2 }}
                key = {c.id}
                clickable
             onClick = {()=>handleAdd(c)}
                />
            ))}
        </div>
    )
}

export default Genres;