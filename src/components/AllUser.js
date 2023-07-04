import axios from "axios";
import React, { useState, useEffect } from "react";
import { NavigationBar } from "./NavigationBar";
import "../App.css";
import { Link } from "react-router-dom";

export const AllUser = () => {
    const [users, setUsers] = useState([]);
    const api = "https://localhost:7074/api/Authenticate/user";

    // using axios to fetch all users from db
    useEffect(() => {
        axios
            .get(api)
            .then((res) => {
                setUsers(res.data);
                // console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <NavigationBar />

            <div className="dashboard">
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h1>All Users</h1>
                    <br></br>
                </div>

                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                        </tr>
                    </thead>
                    <tbody className="dashboard">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <br></br>
                    <Link to="/admindashboard">
                        <button type="button" className="btn btn-dark btn-lg btn-block">
                            Admin Dashboard
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
