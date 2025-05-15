import React, { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/ForgotPassword.css";

function ForgotPassword() {
 const [email, setEmail] = useState("");
     const [newPassword, setNewPassword] = useState("");
     const[answer,setAnswer]=useState("");
     const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot", {
        email,
        answer,
        newPassword,
      });

      if (res.data.success) {
        alert("Password reset successfully");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="form-container m-auto">
        <div className="logo-container">Forgot Password</div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="answer">Security Answer</label>
            <input
              type="text"
              name="answer"
              placeholder="Security Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="form-submit-btn" type="submit">
            Reset Password
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?
          <a href="/register" className="signup-link link">
            {" "}
            Sign up now
          </a>
        </p>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
