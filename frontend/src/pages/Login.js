import axios from 'axios';
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";

const Login = () => {

    //variables and setter functions to capture data entered in the form input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // context API variable and setter function
    const [auth, setAuth] = useAuth();

    //creating hook for navigation
    const navigate = useNavigate();

    //form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password);
            const res = await axios.post('http://localhost:8080/api/auth/login',
                { email, password });
            if (res.data.success) {
                toast.success(res.data.message);
                //context API stuff
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                //saving API stuffs to local storage
                localStorage.setItem('auth', JSON.stringify(res.data));
                //navigate to page not found(for now) page if user loggedin successfully
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                toast.error(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Sorry! Something went wrong. :(');
        }
    }
    return (
        <Layout>
            <div className="row flex d-flex justify-center shadow-lg bg-body rounded"
                style={{ marginTop: '100px', marginLeft: '280px', marginRight: '300px' }}>


                {/** Sign In section */}
                <div className="col-lg-6" style={{
                    height: '500px', width: '600px'
                }}>
                    < h6 className="text-left mt-2" > Ecommerce</h6>
                    <h4 class="fw-bold text-center mt-5 mb-5">Sign In to your Account</h4>

                    {/** Login Form */}
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3 mt-3 px-5">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" id="email" placeholder="Enter email" name="email" required />
                        </div>
                        <div class="mb-5 mt-3 px-5">
                            <label for="pwd" class="form-label">Password:</label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
                        </div>
                        <div style={{ marginLeft: '400px', marginTop: '-30px' }}>
                            <button type="button" class="btn" onClick={() => { setTimeout(() => { navigate("/forgot-password"); }, 1000); }}><u>Forgot Password?</u></button>
                        </div>
                        <div style={{ marginLeft: '260px' }}>
                            <button type="submit" class="btn btn-dark">Sign In</button>
                        </div>
                    </form>
                </div>


                {/**SignUp section */}
                <div className="col-lg-4" style={{ border: '1px solid black', width: '338px', background: 'black' }}>
                    <h3 className="text-center mt-5 text-white px-5">
                        Welcome to our Community!
                    </h3>

                    <p class="text-white fs-6 fw-light" style={{ marginTop: '100px', marginLeft: '20px' }}>
                        Ready to embark on a seamless shopping journey?
                        Sign up now to unlock a world of convenience and increadible deals.
                    </p>
                    <div class="mt-5" style={{ marginLeft: '120px' }}>
                        <Link to="/signup" type="button" class="btn btn-light">Sign Up</Link>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Login;
