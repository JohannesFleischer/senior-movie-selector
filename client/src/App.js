import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://localhost:3000/api/movies"
const css_class = "selected"

var movie_count = 4;
var counter = 0;

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    selectMovies();
    }, []);
  
  const inc_counter = () => {
    if (counter >= movie_count-1) counter = 0;
    else counter++;
  };

  const dec_counter = () => {
    if (counter < 1) counter = movie_count-1;
    else counter--;
  };

  const selectMovies = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    var all_movies = data.data;

    if (typeof all_movies === "undefined") {
      setMovies([]);
      movie_count = 0;
      return;
    }

    if(all_movies.length <= movie_count){
      setMovies(all_movies);
      movie_count = all_movies.length;
    }
    else{
      var movie_selection = [];
      for(var n of genRandomInts(movie_count, all_movies.length)){
        movie_selection.push(all_movies[n])
      }
      setMovies(movie_selection);
    }
  }

  function genRandomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max))
    }
    return Array.from(set);
  }

  const update_metadata = () => {
    getElem("metadata").innerHTML = get_metadata();
  }

  const get_metadata = () => {
    if (typeof movies[counter] === "undefined") return "";
    var name = movies[counter]?.Name;
    var year = movies[counter]?.Year;
    var desc = movies[counter]?.Description;
    return name + " (" + year + "):<br/>" + desc;
  }

  document.onkeydown = function (event) {
    try{
      if (event.key === "ArrowRight") {
          rmvCssClass(counter, css_class);
          inc_counter();
          addCssClass(counter, css_class);
          update_metadata();
      } 
      else if (event.key === "ArrowLeft") {
          rmvCssClass(counter, css_class);  
          dec_counter();
          addCssClass(counter, css_class);
          update_metadata();
      } 
      else if (event.key === "Enter") {
          getElem(counter).click();
      } 
      else if (event.key === "ArrowUp" || event.key === "Backspace" || event.key === "Escape") {
          window.location.reload();
      } 
      else if (event.key === "ContextMenu") {
          // TODO
      }
    }catch{
      console.error("Error on \"" + event.key + "\" event:\nIf the Film-List is empty the element with id=" + counter + " was probably not found.");
    }
    
}

  function addCssClass(id, className) {
    getElem(id).classList.add(className);
  }

  function rmvCssClass(id, className) {
    getElem(id).classList.remove(className);
  }

  function getElem(id){
    return document.getElementById(id);
  }

  return (
    <div className="app">
      <h1 id={"banner"} style={{cursor: "pointer" }} onClick={() => window.location.reload() }>Filmauswahl</h1>

      {movies?.length > 0 ? (
        <div id="movie-container" className="container">
          {movies.map((movie, index) => (
            <MovieCard id={index} selected={counter} key={index} movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      <h2 id="metadata" dangerouslySetInnerHTML={{__html: get_metadata()}}></h2>
    </div>
  );
};

export default App;
