import React, { useState } from "react";
import LoginForm from "./components/loginForm";
import { useNavigate, NavLink } from "react-router-dom";
import {LeftCircleFilled} from '@ant-design/icons'
import "./login.css";

const Login = () => {
    let navigate = useNavigate();

    const adminUser = {
        email: "admin@gmail.com",
        password: "123456",
    };

    const [user, setUser] = useState({ username: "", email: "" });

    const login = details => {
        console.log(details);

        if (
            details.email === "" ||
            details.username === "" ||
            details.password === ""
        ) {
            return "Vui lòng nhập đủ thông tin";
        } else if (
            details.email === adminUser.email &&
            details.password === adminUser.password
        ) {
            console.log("Logged in");
            setUser({
                username: details.username,
                email: details.email,
            });
            navigate("/");
        } else {
            console.log("Thông tin đăng nhập sai");
            return "Thông tin đăng nhập sai";
        }
    };

    const logout = () => {
        console.log("Logout");
        setUser({
            username: "",
            email: "",
        });
    };

    return (
        <div className = 'login-page'>
            <nav className = 'login-nav'>
                <NavLink to='/'><LeftCircleFilled className ='nav-icon'/></NavLink>
            </nav>
            <div className="login-content">
                {user.email !== "" ? (
                    <div className="login-welcome">
                        <h2>
                            Welcome, <span>{user.username}</span>
                        </h2>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                ) : (
                    <LoginForm login={login} />
                )}
            </div>
        </div>
    );
};

export default Login;