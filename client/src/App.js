import React, { useState, useEffect } from "react";

import MovieCard from "./MovieCard";
import "./App.css";

const API_URL = "http://localhost:3000/api/movies"
const movie_count = 5;

const App = () => {
  const [movies, setMovies] = useState([]);

useEffect(() => {
  selectMovies();
  }, []);

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
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
