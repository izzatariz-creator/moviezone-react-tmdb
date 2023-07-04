import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { NavigationBar } from "./NavigationBar";

export const AdminDashboard = () => {
    return (
        <>
            <NavigationBar />
            <div className="dashboard">
                <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                    <h1>Admin Dashboard</h1>
                    <br></br>
                    <br></br>
                    <h3>User Management</h3>
                    <br></br>
                    <Link to="/adduser">
                        <button type="button" className="btn btn-dark btn-lg btn-block">
                            Add User
                        </button>
                    </Link>
                    <br></br>
                    <Link to="/addadmin">
                        <button type="button" className="btn btn-dark btn-lg btn-block">
                            Add Admin
                        </button>
                    </Link>
                    <br></br>
                    <Link to="/alluser">
                        <button type="button" className="btn btn-dark btn-lg btn-block">
                            View All User
                        </button>
                    </Link>

                    <br></br>
                    <br></br>
                    <h3>Movie Management</h3>
                    <br></br>
                    <Link to="/moviemanagement">
                        <button type="button" className="btn btn-dark btn-lg btn-block">
                            Manage Movie
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};
