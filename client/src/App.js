import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://localhost:3000/api/movies"
const movie_count = 5;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(0);

useEffect(() => {
  selectMovies();
  }, []);

  const inc_counter = () => {
    setCounter(couter => counter +1);
    if (counter >= movie_count-1)setCounter(0);
  };

  const dec_counter = () => {
    setCounter(count => count - 1);
    if (counter < 1) setCounter(movie_count-1);
  };


const selectMovies = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    var all_movies = data.data;

    if(all_movies.length <= movie_count){
      setMovies(all_movies);
    }
    else{
      var movie_selection = [];
      for(var n of genRandomInts(movie_count, all_movies.length)){
        movie_selection.push(all_movies[n])
      }
      setMovies(movie_selection);
    }
    
  };

  document.onkeydown = function (event) {
    // TODO highlight current element
    if (event.key === "ArrowRight") {
        inc_counter();
    } else if (event.key === "ArrowLeft") {
        dec_counter();
    } else if (event.key === "Enter") {
        var selectedElementID = counter;
        document.getElementById(selectedElementID).click();
    }else if (event.key === "Backspace" || event.key === "Escape") {
        window.location.reload(); 
  }
}

  function genRandomInts(quantity, max){
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max))
    }
    return Array.from(set);
  }

  return (
    <div className="app">
      <h1 style={{cursor: "pointer" }} onClick={() => window.location.reload() }>Filmauswahl</h1>

      {movies?.length > 0 ? (
        <div id="movie-container" className="container">
          {movies.map((movie, index) => (
            <MovieCard id={index} movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
      <h2>{counter}</h2>
    </div>
  );
};

export default App;
