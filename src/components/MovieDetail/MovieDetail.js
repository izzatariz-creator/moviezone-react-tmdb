import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavigationBar } from "../NavigationBar";
import "./MovieDetail.css";
import "./card.css";

const API_KEY = "api_key=9bf3ce744d5c5df6ca18c4875bbb36f2";

const MovieDetail = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [recommendations, SetRecommendations] = useState();
    const [trailer, SetTrailer] = useState();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        // getTrailer();
        const fetchTrailer = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${API_KEY}`);
            const data = await response.json();
            const trailer = data.results.find((video) => video.type === "Trailer");
            SetTrailer(trailer);
        };
        fetchTrailer();
        getData();
        getRecommendation();
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    };

    const getRecommendation = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?${API_KEY}&language=en-US`)
            .then((res) => res.json())
            .then((data) => SetRecommendations(data.results));
    };

    return (
        <>
            <NavigationBar />

            <div className="movie">
                <div className="movie__intro">
                    <div className="movie__backdrop">
                        <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detail">
                    <div className="movie__detailLeft">
                        <div className="movie__posterBox">
                            <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                        </div>
                    </div>
                    <div className="movie__detailRight">
                        <div className="movie__detailRightTop">
                            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                            <div className="movie__rating">
                                {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i className="fas fa-star" />
                                <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                            </div>
                            <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                            <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                            <div className="movie__genres">
                                {currentMovieDetail && currentMovieDetail.genres
                                    ? currentMovieDetail.genres.map((genre) => (
                                          <>
                                              <span className="movie__genre" id={genre.id}>
                                                  {genre.name}
                                              </span>
                                          </>
                                      ))
                                    : ""}
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="movie__detailRightBottom">
                            <div className="synopsisText">Movie Overview</div>
                            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                        </div>
                    </div>
                </div>

                <div className="movie__links">
                    <div className="movie__heading">Useful Links</div>
                    {currentMovieDetail && currentMovieDetail.homepage && (
                        <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: "none" }}>
                            <p>
                                <span className="movie__homeButton movie__Button">
                                    Homepage <i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    )}
                    {trailer && (
                        <a href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" style={{ textDecoration: "none" }}>
                            <p>
                                <span className="movie__trailerButton movie__Button">
                                    Trailer <i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    )}
                    {currentMovieDetail && currentMovieDetail.imdb_id && (
                        <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{ textDecoration: "none" }}>
                            <p>
                                <span className="movie__imdbButton movie__Button">
                                    IMDb<i className="newTab fas fa-external-link-alt"></i>
                                </span>
                            </p>
                        </a>
                    )}
                </div>

                <div className="movie__heading">Movies You May Like</div>
                <br></br>
                <br></br>
                <div className="list__cards">
                    {recommendations ? (
                        recommendations.slice(0, 6).map(({ id, poster_path, original_title }) => (
                            <Link to={`/movie/${id}`} key={id} style={{ textDecoration: "none", color: "white" }}>
                                <div className="cards">
                                    <img className="cards__img" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`Movie Poster`} />
                                    <div className="cards__overlay">
                                        <div className="card__title">{original_title ? original_title : ""}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h1>Not Found</h1>
                    )}
                </div>
                <br></br>
                <br></br>
                <br></br>

                <div className="movie__heading">Production companies</div>
                <div className="movie__production">
                    {currentMovieDetail &&
                        currentMovieDetail.production_companies &&
                        currentMovieDetail.production_companies.map((company) => (
                            <>
                                {company.logo_path && (
                                    <span className="productionCompanyImage">
                                        <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                        <span>{company.name}</span>
                                    </span>
                                )}
                            </>
                        ))}
                </div>

                <br></br>
                <br></br>
                <br></br>
            </div>
        </>
    );
};

{
}

export default MovieDetail;
