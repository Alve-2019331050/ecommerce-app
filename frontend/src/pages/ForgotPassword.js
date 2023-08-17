import axios from 'axios';
import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Layout from "../components/Layout/Layout";

const ForgotPassword = () => {
  //variables and setter functions to capture data entered in the form input fields
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  //creating hook for navigation
  const navigate = useNavigate();

  //form function
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const res = await axios.post('http://localhost:8080/api/auth/forgot-password',
              { email, newPassword,answer });
          if (res.data.success) {
              toast.success(res.data.message);
              
              setTimeout(() => {
                  navigate("/login");
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
    <Layout title={'Forgot Password - Ecommerce App'}>
        <div className="row flex d-flex justify-center shadow-lg bg-body rounded"
                style={{ marginTop: '100px', marginLeft: '280px', marginRight: '300px' }}>


                <div className="col-lg-6" style={{
                    height: '500px', width: '600px'
                }}>
                    < h6 className="text-left mt-2" > Ecommerce</h6>
                    <h4 class="fw-bold text-center mt-5 mb-5">Reset Password</h4>

                    <form onSubmit={handleSubmit}>
                        <div class="mb-3 mt-3 px-5">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" id="email" placeholder="Enter email" name="email" required />
                        </div>
                        <div class="mb-3 mt-3 px-5">
                            <label for="email" class="form-label">Question:</label>
                            <input type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="form-control" id="email" placeholder="Enter your favourite hobby" name="email" required />
                        </div>
                        <div class="mb-5 mt-3 px-5">
                            <label for="pwd" class="form-label">Password:</label>
                            <input type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="form-control" id="pwd" placeholder="Enter New password" name="pswd" required />
                        </div>
                        <div style={{ marginLeft: '260px' }}> 
                            <button type="submit" class="btn btn-dark">Reset</button>
                        </div>
                    </form>
                </div>
            </div >
    </Layout>
  );
}

export default ForgotPassword