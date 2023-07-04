import React, { useState, useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;
const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieCard = ({ title, poster_path, overview, vote_average }) => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      setTimeout(() => {
         setIsLoading(false);
      }, 1500);
   }, []);

   //determine the color of rating
   const getRatingColor = (rating) => {
      if (rating >= 8) {
         return "green";
      } else if (rating >= 5) {
         return "orange";
      } else {
         return "red";
      }
   };

   // display all movie card
   return (
      <>
         {isLoading ? (
            <div className="movieCard">
               <SkeletonTheme color="#202020" highlightColor="#444">
                  <Skeleton height={450} duration={2} />
               </SkeletonTheme>
            </div>
         ) : (
            <div className="movieCard">
               <img
                  src={
                     poster_path
                        ? API_IMG + poster_path
                        : "https://placehold.co/1080x1580"
                  }
                  alt="Movie"
               ></img>

               <div className="overview">
                  <h3>{title}</h3>
                  <div className="info">
                     <span style={{ color: getRatingColor(vote_average) }}>
                        {vote_average}
                     </span>
                  </div>
                  <div style={{ textAlign: "justify" }}>
                     {overview.slice(0, 250) + "..."}
                  </div>
                  <br />
                  <br />
               </div>
            </div>
         )}
      </>
   );
};

export const Home = () => {
   const [movies, setMovies] = useState([]);
   const [query, setQuery] = useState([]);

   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   //using axios to fetch movie from api
   useEffect(() => {
      const fetchMovies = async () => {
         const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&include_adult=false&page=${page}`
         );
         setMovies(data.results);
         setTotalPages(data.total_pages);
         console.log(data.results);
      };

      window.scrollTo(0, 0);

      fetchMovies();
   }, [page]);

   //Function to search movie
   const searchMovie = async (e) => {
      e.preventDefault();

      // setPage(1);

      if (query.length > 0) {
         try {
            const url = `${SEARCH_URL}&query=${query}`;
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.total_results);
            setMovies(data.results);
         } catch (e) {
            console.log(e);
         }
      } else {
         const fetchMovies = async () => {
            setPage(1);
            const { data } = await axios.get(
               `https://api.themoviedb.org/3/movie/popular?${API_KEY}&language=en-US&include_adult=false&page=${page}`
            );
            setMovies(data.results);
         };

         fetchMovies();
      }
   };

   //Function to set search query
   const setSearchQuery = (e) => {
      setQuery(e.target.value);
   };

   return (
      <>
         <div>
            <NavigationBar
               searchMovie={searchMovie}
               setSearchQuery={setSearchQuery}
            />

            <h2 className="pageTitle">Popular Movies</h2>

            {movies.length > 0 ? (
               <div className="movieList">
                  {movies.map((movie) => (
                     <Link
                        to={`/movie/${movie.id}`}
                        key={movie.id}
                        style={{ textDecoration: "none", color: "white" }}
                     >
                        <MovieCard key={movie.id} {...movie} />
                     </Link>
                  ))}
               </div>
            ) : (
               <div className="movieList">
                  {<p className="warning">Sorry! No Movies Found</p>}
               </div>
            )}
         </div>

         <div className="pagination center">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
               Previous
            </button>
            <button
               disabled={page === totalPages}
               onClick={() => setPage(page + 1)}
            >
               Next
            </button>
         </div>

         <br></br>
         <br></br>
      </>
   );
};
