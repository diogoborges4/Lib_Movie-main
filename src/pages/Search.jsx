import React from "react";

import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";
import { useState, useEffect } from "react";

const Search = () => {
  const [searcParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const query = searcParams.get("q");

  const searchedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

    searchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movie-container">
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
