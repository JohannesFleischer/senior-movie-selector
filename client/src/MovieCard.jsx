import React from 'react';

const base_url =  "http://localhost:1337"
const videoplayer_url = base_url + "/main.html?film=";
const img_base = base_url + "/poster/";
const noimage_url = img_base + "noimage.png"; 

const MovieCard = ({ id, selected, movie: { ID, Name, Year, Poster, Videofile, Duration, Description }}) => {
  return (
    <div id={id} key={ID} style={{cursor: "pointer" }} className={id !== selected? "movie": "movie selected"} onClick={ () => redirect(videoplayer_url + Videofile)}>
      <div>
        <h2>{Duration} Min</h2>
      </div>

      <div>
        <img src={getPoster(Poster)} alt={Name} />
      </div>

      <div>
        <h3>{Name}</h3>
      </div>
    </div>
  );
}

function redirect(url){
  window.location.href = url;
}

function getPoster(filename){
  const url = base_url + "/poster/" + filename
  return url;
}

export default MovieCard;