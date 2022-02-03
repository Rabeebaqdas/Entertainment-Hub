import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useEffect } from 'react';
import CustomPagination from '../components/CustomPagination';
import SingleContent from '../components/SingleContent';
import '../App.css';
export const Search = () => {
    const darkTheme = createTheme({
        palette: {
            type: "dark",
            primary: {
                main: "#fff"
            }
        }
    })
    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    const [type, setType] = useState();
    const [page, setpage] = useState(1);
    const [numOfPages, setnumOfPages] = useState();
    const [content, setcontent] = useState([]);
    const [search, setSearch] = useState('');
    const [btn, setbtn] = useState('');

    useEffect(() => {
        const fetchSearch = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/search/${type == 1 ? "tv" : "movie"}?api_key=${REACT_APP_API_KEY}&language=en-US&query=${btn}&page=${page}&include_adult=false`)
            const data = await response.json();
            setcontent(data.results)
            console.log(content)
            setnumOfPages(data.total_pages);
        }
    
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page, btn]);
    const getsearch = () => {
        setbtn(search);
        setSearch('');
    }
  
    return (
        <div>
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex", margin: "15px 0" }}>
                    <TextField
                        value={search}
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="contained" style={{ marginLeft: "10px", }} onClick={getsearch}><SearchIcon /></Button>
                </div>

                <Tabs className="tabs" value={type} indicatorColor="primary" textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue);
                        setpage(1);
                    }}
                    style={{ paddingBottom: "5px" }}
                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search Tv Series" />

                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {content && content.map((c) => (
                    <SingleContent key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type={type == 1 ? "tv" : "movie"}
                        vote_average={c.vote_average}
                    />
                ))
                }
                {   btn &&
                    !content &&
                    (type == 1 ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)
                }
              
            </div>
            {numOfPages > 1 &&
                <CustomPagination setpage={setpage} numOfPages={numOfPages} />
            }
        </div>
    )
}

export default Search;