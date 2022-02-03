import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv'
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#39445a',
        zIndex: 100,
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    useEffect(() => {
        if (value === 0) {
            navigate('/');
        }
        else if (value === 1) {
            navigate('/movies');
        }
        else if (value === 2) {
            navigate('/series');
        }
        else if (value === 3) {
            navigate('/search');
        }

    }, [value,navigate])
    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction style={{ color: "white" }} label="Trending" icon={<WhatshotIcon />} onClick={()=>window.scroll(0,0)}/>
            <BottomNavigationAction style={{ color: "white" }} label="Movies" icon={<MovieIcon />} onClick={()=>window.scroll(0,0)} />
            <BottomNavigationAction style={{ color: "white" }} label="TV Series" icon={<TvIcon />} onClick={()=>window.scroll(0,0)}/>
            <BottomNavigationAction style={{ color: "white" }} label="Search" icon={<SearchIcon />} onClick={()=>window.scroll(0,0)} />
        </BottomNavigation>
    );
}
