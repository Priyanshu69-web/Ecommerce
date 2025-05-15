
import Layout from "../../components/Layouts/Layout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {useAuth} from '../../components/context/Auth';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,

            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                });
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate("/");

            } else {
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    }

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items w-50 shadow my-5 py-5 h-100">
                <div className="row">
                    <h1>Login</h1>
                    <div className="col">
                        <form onSubmit={handleSubmit}>
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} name="email"></input>
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} name="password" ></input>
                            <a href="/forgotpassword">Forgot Password</a>
                            <button type="submit" className="btn btn-primary m-3 ">Login</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login;