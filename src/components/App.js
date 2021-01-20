import React, { useState, useEffect } from "react";
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=bdc06cf3";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
    .then(req => req.json())
    .then(res => {
      setMovies(res.Search);
      setLoading(false);
    });
  },[]);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch('https://www.omdbapi.com/?s=${searchValue}&apikey=bdc06cf3')
    .then(req => req.json())
    .then(res => {
      if(res.Response === "True") {
        setMovies(res.Search);
        setLoading(false);
      } else {
        setErrorMessage(res.Error);
        setLoading(false);
      }
    });
  };

  return (
    <div className="App">
      <Header text="Movies"/>
      <Search search={search}/>
      <p className="App-intro">Sharing a few movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie,index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );

};


export default App;
