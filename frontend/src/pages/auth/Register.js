import Layout from "..//../components/Layouts/Layout";
import React, {useState} from"react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Register() {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[phone,setPhone]=useState("");
  const[address,setAddress]=useState("");
  const[answer,setAnswer]=useState("");
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("/api/v1/auth/register",{
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if(res && res.data.success){
        toast.success(res.data && res.data.message);
        navigate('/login');

      }else{
        toast.success(res.data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error("something went wrong");
    }
  };
    return (
      <Layout>
        <div className="container d-flex justify-content-center w-50 shadow my-5 py-5 h-100">
          <div className="row">
            <h1 className="my-3">Register</h1>
            <div className="col">
              <form onSubmit={handleSubmit}>
                <label className="form-label">Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" name="name"></input>
                <label className="form-label">Email</label>
                <input type="email"value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" name="email"></input>
                <label className="form-label">Password</label>
                <input
                  type="password"
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                  className="form-control"
                  name="password"
                ></input>
                <label className="form-label">Phone</label>
                <input
                  type="Number"
                  value={phone} onChange={(e)=>setPhone(e.target.value)}
                  className="form-control"
                  name="Phone"
                ></input>
                <label className="form-label">Address</label>
                <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" name="address"></input>
                <label className="form-label">Answer</label>
                <input type="text"value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" name="answer"></input>
                <button type="submit" className="btn btn-primary my-3 ">Register</button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
export default Register;
