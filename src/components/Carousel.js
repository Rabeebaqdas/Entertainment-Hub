import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../config';
import '../App.css';
const handleDragStart = (e) => e.preventDefault();


const Carousel = ({media_type,id}) => {

    const REACT_APP_API_KEY = '207aac95f4e37be89af8e3f27c5bd7bd';
    const [credit, setcredit] = useState();
    useEffect(() => {
      const fetchImg = async()=>{
          const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`)
        const data = await response.json();
        setcredit(data.cast);
    
        }
        fetchImg();
    }, [])
    const items = credit?.map((c)=>(
        <div className="carouselItem">  
     <img src={c.profile_path ? `${img_300}/${c.profile_path}`:noPicture} alt={c?.name}
     onDragStart={handleDragStart}
     className="carouselItem__img"
     />
     <b>{c?.name}</b>
 </div>  
 ))
const responsive = {
    0:{
        items:3,

    },
    512:{
        items:5,
        
    },
    1024:{
        items:7,
        
    }
}
  return (
    <AliceCarousel 
    autoPlay 
    responsive={responsive}
    infinite
    disableDotsControls
    disableButtonsControls
    mouseTracking 
    items={items} />
  );
}

export default Carousel;