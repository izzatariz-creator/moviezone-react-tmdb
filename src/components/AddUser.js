import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationBar } from "./NavigationBar";
import "../App.css";

export const AddUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const api = "https://localhost:7074/api/Authenticate/register";

    const navigate = useNavigate();

    // form validation
    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter this field:  ";

        if (username === null || username === "") {
            isproceed = false;
            errormessage += " Username";
        }

        if (email === null || email === "") {
            isproceed = false;
            errormessage += " Email";
        }

        if (password === null || password === "") {
            isproceed = false;
            errormessage += " Password";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
            } else {
                isproceed = false;
                toast.warning("Please enter the valid email");
            }

            if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\d])[A-Za-z\d!@#$%^&*()_+,-./:;<=>?@[\]^_`{|}~]{6,}$/.test(password)) {
            } else {
                isproceed = false;
                toast.warning("Password must contain an uppercase character, lowercase character, a digit, and a non-alphanumeric character. Passwords must be at least six characters long.");
            }
        }
        return isproceed;
    };

    // event triggered after user click on submit
    const handlesubmit = (e) => {
        e.preventDefault();

        if (IsValidate()) {
            axios
                .post(api, {
                    Username: username,
                    Email: email,
                    Password: password,
                })
                .then((res) => {
                    toast.success("User registered");
                    navigate("/admindashboard");
                })
                .catch((err) => {
                    toast.error("Login failed, the username could be taken: " + err.message);
                });
        }
    };

    return (
        <>
            <NavigationBar />

            <div>
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">
                            <div className="card-header">
                                <h2>Add User</h2>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                Username <span className="errmsg">*</span>
                                            </label>
                                            <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                Email <span className="errmsg">*</span>
                                            </label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>
                                                Password <span className="errmsg">*</span>
                                            </label>
                                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control"></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-dark">
                                    Submit
                                </button>
                                &nbsp; &nbsp;
                                <Link className="btn btn-dark" style={{ float: "right" }} to={"/admindashboard"}>
                                    Back
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
