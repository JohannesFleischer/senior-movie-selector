import { file } from '@babel/types';
import React from 'react';

const videoplayer_url = "http://localhost:1337/main.html?film=";
const noimage_url = "http://localhost:1337/poster/noimage.png" 

const MovieCard = ({ movie: { ID, Name, Year, Poster, Videofile, Duration, Description } }) => {
  return (
    <div style={{cursor: "pointer" }} className="movie" key={ID} onClick={ () => redirect(videoplayer_url + Videofile) }>
      <div>
        <p>{Year}</p>
        <text > {Description} </text>
      </div>

      <div>
        <img src={Poster !== "N/A" ? 'http://localhost:1337/poster/' + Poster : noimage_url } alt={Name} />
      </div>

      <div>
        <span>{Duration} Minuten</span>
        <h3>{Name}</h3>
      </div>
    </div>
  );
}

function redirect(url){
  window.location.replace(url);
}

export default MovieCard;