import { file } from '@babel/types';
import React from 'react';

const base_url =  "http://localhost:1337"
const videoplayer_url = base_url + "/main.html?film=";
const noimage_url = base_url + "/poster/noimage.png" 

const MovieCard = ({ id, movie: { ID, Name, Year, Poster, Videofile, Duration, Description }}) => {
  return (
    <div id={id} key={ID} style={{cursor: "pointer" }} className="movie" onClick={ () => redirect(videoplayer_url + Videofile) }>
      <div>
        <p>{Year}</p>
        <h4> {Description} </h4>
      </div>

      <div>
        <img src={getPoster(Poster)} alt={Name} />
      </div>

      <div>
        <span>{Duration} Min</span>
        <h3>{Name}</h3>
      </div>
    </div>
  );
}

function redirect(url){
  window.location.replace(url);
}

function imageExists(url) 
{
   var img = new Image();
   img.src = url;
   return img.height != 0;
}

function getPoster(filename){
  const url = base_url + "/poster/" + filename

  if (imageExists(url)){
    return url;
  } else{
    return noimage_url;
  }

}

export default MovieCard;