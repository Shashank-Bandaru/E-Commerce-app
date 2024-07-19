import React,{useState} from "react";
import Layout from "../../components/Layout";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../../styles/Authstyles.css';

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [answer,setAnswer] = useState("");
  const navigate = useNavigate();

// form submit handler
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_LINK}/api/v1/auth/register`,
      {name,email,password,phone,address,answer}
    );
    if(res.data.success){
      toast.success(res.data.message);
      navigate('/login');
    }else{
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong')
  }
};

  return (
    <Layout title={"Registration - E-Commerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputName" className="form-label">
              Name
            </label> */}
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="form-control"
              id="exampleInputName"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id
            </label> */}
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter your email id"
              required
            />
          </div>
          
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label> */}
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id
            </label> */}
            <input
              type="text"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Phone number"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id
            </label> */}
            <input
              type="text"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter your Address"
              required
            />
          </div>
          <div className="mb-3">
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id
            </label> */}
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Name of your Favourite Sport? "
              required
            />
          </div>

          
          
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
