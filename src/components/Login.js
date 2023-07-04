import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavigationBar } from "./NavigationBar";
import "../App.css";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const api = "https://localhost:7074/api/Authenticate/login";

    const usenavigate = useNavigate();

    // clear all session storage
    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();

        if (validate()) {
            axios
                .post(api, {
                    Username: username,
                    Password: password,
                })
                .then((res) => {
                    if (Object.keys(res).length === 0) {
                        toast.error("Login failed, invalid credentials");
                    } else {
                        toast.success("Success");
                        sessionStorage.setItem("username", username);
                        sessionStorage.setItem("token", res.data.token);
                        sessionStorage.setItem("role", res.data.roles);

                        setRole(res.data.roles);

                        // console.log(res.data.roles);

                        if (res.data.roles === "User") {
                            usenavigate("/");
                        } else {
                            usenavigate("/admindashboard");
                        }
                    }
                })
                .catch((err) => {
                    toast.error("Wrong User Name or Password");
                });
        }
    };

    // form validation
    const validate = () => {
        let result = true;
        if (username === "" || username === null) {
            result = false;
            toast.warning("Please Enter Username");
        }
        if (password === "" || password === null) {
            result = false;
            toast.warning("Please Enter Password");
        }
        return result;
    };

    return (
        <>
            <NavigationBar />
            <div className="formDesign">
                <div className="offset-lg-3 col-lg-6" style={{ marginTop: "100px" }}>
                    <form onSubmit={ProceedLoginusingAPI} className="container">
                        <div className="card">
                            <div className="card-header">
                                <h2>User Login</h2>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>
                                        Username <span className="errmsg">*</span>
                                    </label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
                                </div>
                                <div className="form-group">
                                    <label>
                                        Password <span className="errmsg">*</span>
                                    </label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control"></input>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-dark">
                                    Login
                                </button>{" "}
                                &nbsp; &nbsp;
                                <Link className="btn btn-dark" to={"/register"} style={{ float: "right" }}>
                                    Register Here
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
