import React,{useState} from "react";
import Layout from "../../components/Layout";
import {toast} from 'react-toastify'
import { useNavigate ,useLocation} from "react-router-dom";
import axios from 'axios'
import '../../styles/Authstyles.css';
import { useAuth } from "../../context/auth";
const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
// form submit handler
const handleSubmit = async (e)=>{
  e.preventDefault();
  try {
    const res = await axios.post(`${process.env.REACT_APP_LINK}/api/v1/auth/login`,
      {email,password}
    );
    if(res&&res.data.success){
      toast.success(res.data.message);
      setAuth(
        {
          ...auth,
          user:res.data.user,
          token:res.data.token
        }
      )
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate(location.state||'/');
    }else{
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong!')
  }
};

  return (
    <Layout title={"Login - E-Commerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>
         
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
          <button type="button" className="btn btn-dark" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Login