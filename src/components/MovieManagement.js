import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationBar } from "./NavigationBar";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState([]);
    const [description, setDescription] = useState([]);
    const [rating, setRating] = useState([]);
    const [genre, setGenre] = useState([]);
    const [movieId, setMovieId] = useState([]);
    const api = "https://localhost:7074/api/Movie/GetMovies";
    const apiadd = "https://localhost:7074/api/Movie/AddMovie";
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleDelete = () => setShowModal(false);

    // load all data
    useEffect(() => {
        (async () => await Load())();
    }, []);

    //using axios to get all movies from db
    async function Load() {
        axios
            .get(api)
            .then((res) => {
                setMovies(res.data);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // form validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter this field:  ";

        if (title === null || title === "") {
            isproceed = false;
            errormessage += " Title";
        }

        if (description === null || description === "") {
            isproceed = false;
            errormessage += " Description";
        }

        if (genre === null || genre === "") {
            isproceed = false;
            errormessage += " Genre";
        }

        if (rating === null || rating === "") {
            isproceed = false;
            errormessage += " Rating";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/.test(rating)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid rating (0-10)");
            }
        }
        return isproceed;
    };

    // function to add new movie
    async function save(e) {
        e.preventDefault();

        if (IsValidate()) {
            await axios
                .post(apiadd, {
                    title: title,
                    description: description,
                    genre: genre,
                    rating: rating,
                })
                .then((res) => {
                    toast.success("Movie added successfully");
                    Load();
                })
                .catch((err) => {
                    toast.error("Please enter all required fields");
                });
        }
    }

    // function to edit movie
    async function editMovie(movie) {
        setTitle(movie.title);
        setDescription(movie.description);
        setMovieId(movie.movieId);
        setGenre(movie.genre);
        setRating(movie.rating);
    }

    // function to reset value inside form
    async function reset() {
        setTitle("");
        setDescription("");
        setMovieId("");
        setGenre("");
        setRating("");
    }

    // function to update movie
    async function update(e) {
        e.preventDefault();

        if (IsValidate()) {
            await axios
                .patch("https://localhost:7074/api/Movie/UpdateMovie/" + movies.find((u) => u.movieId === movieId).movieId || movieId, {
                    title: title,
                    description: description,
                    genre: genre,
                    rating: rating,
                    movieId: movieId,
                })
                .then((res) => {
                    toast.success("Movie updated successfully");
                    Load();
                })
                .catch((err) => {
                    toast.error("Please enter all required fields");
                });
        }
    }

    return (
        <>
            <NavigationBar />

            <div className="offset-lg-3 col-lg-6" style={{ marginTop: "50px" }}>
                <form className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2>Movie Management</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="id"
                                    hidden
                                    value={movieId}
                                    onChange={(event) => {
                                        setMovieId(event.target.value);
                                    }}
                                />
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Title <span className="errmsg">*</span>
                                        </label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Description <span className="errmsg">*</span>
                                        </label>
                                        <input value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="description"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Genre <span className="errmsg">*</span>
                                        </label>
                                        <select value={genre} onChange={(e) => setGenre(e.target.value)} className="form-control" id="genre">
                                            <option value="" disabled>
                                                Select genre
                                            </option>
                                            <option value="Action">Action</option>
                                            <option value="Comedy">Comedy</option>
                                            <option value="Drama">Drama</option>
                                            <option value="Horror">Horror</option>
                                            <option value="Romance">Romance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>
                                            Rating <span className="errmsg">*</span>
                                        </label>
                                        <input value={rating} onChange={(e) => setRating(e.target.value)} className="form-control" id="rating"></input>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-primary mt-4" onClick={save}>
                                        Add Movie
                                    </button>
                                    &nbsp; &nbsp;
                                    <button className="btn btn-warning mt-4" onClick={update}>
                                        Update Movie
                                    </button>
                                    &nbsp; &nbsp;
                                    <button className="btn btn-dark mt-4" onClick={reset}>
                                        Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <br></br>

            <div className="movieManagement">
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h1>All Movies</h1>
                    <br></br>
                </div>

                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col" style={{ width: "5%" }}>
                                ID
                            </th>
                            <th scope="col" style={{ width: "25%" }}>
                                Title
                            </th>
                            <th scope="col" style={{ width: "30%" }}>
                                Description
                            </th>
                            <th scope="col" style={{ width: "10%" }}>
                                Genre
                            </th>
                            <th scope="col" style={{ width: "10%" }}>
                                Rating
                            </th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="dashboard">
                        {movies.map((movie) => (
                            <tr key={movie.movieId}>
                                <td>{movie.movieId}</td>
                                <td>{movie.title}</td>
                                <td>{movie.description}</td>
                                <td>{movie.genre}</td>
                                <td>{movie.rating}</td>
                                <td>
                                    <button type="button" className="btn btn-warning" onClick={() => editMovie(movie)} style={{ background: "yellow" }}>
                                        Edit
                                    </button>
                                    <DeleteConfirmationModal id={movie.movieId} show={showModal} onClose={handleClose} onDelete={handleDelete} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5">
                    <br></br>
                    <Link to="/admindashboard">
                        <button type="button" className="btn btn-dark btn-lg btn-block" style={{ width: "250px" }}>
                            Admin Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
