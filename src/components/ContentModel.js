import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Typography from '@mui/material/Typography';
import '../App.css';
import { img_500, unavailable, unavailableLandscape } from '../config';
import Carousel from './Carousel';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "80%",
    bgcolor: '#39445a',
    border: '1px solid #282c34',
    color: "white",
    boxShadow: 24,
    p: 4,
};

export default function ContentModel({ children, media_type, id }) {
    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [content, setcontent] = useState([]);
    const [video, setvideo] = useState();

    useEffect(() => {
        const fetchModel = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${REACT_APP_API_KEY}&language=en-US`)
            const data = await response.json();
            setcontent(data);
  
        }
        fetchModel();
        
        const fetchVideo = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`)
            const data = await response.json();
            setvideo(data.results[0]?.key)

        }
        fetchVideo();
    }, [])

    return (
        <div>
            <div className="media" onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                 
                            {content && (
                                <div className="ContentModal">
                                    <img src={content.poster_path?`${img_500}/${content.poster_path}`: unavailable} className="ContentModal__portrait" alt={content.name || content.title}/>
                                    <img src={content.poster_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} className="ContentModal__landscape" alt={content.name || content.title} />
                                    <div className="ContentModal__about">
                                        <span className="ContentModal__title">
                                            {content.name || content.title}
                                            (
                                            {
                                                (content.first_air_date || content.release_date || "------").substring(0, 4)
                                            }
                                            )
                                        </span>
                                        {
                                            content.tagline && (
                                                <i className="tagline">{content.tagline}</i>
                                            )
                                        }
                                        <span className="ContentModal__description">
                                            {content.overview}
                                        </span>
                                        <div>
                                        <Carousel media_type={media_type} id={id} />
                                        </div>
                                        <Button variant="contained" startIcon={<YouTubeIcon />} target="_blank"
                                        color="error"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                        >Watch The Trailer</Button>
                                    </div>
                                </div>

                            )}
               
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
