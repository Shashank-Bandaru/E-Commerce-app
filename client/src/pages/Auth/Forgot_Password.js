import React,{useState} from "react";
import Layout from "../../components/Layout";
import {toast} from 'react-toastify'
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import '../../styles/Authstyles.css';


const Forgot_Password = () => {
    const [email,setEmail] = useState("");
    const [newpassword,setnewPassword] = useState("");
    const [answer,setAnswer] = useState("");
    
    const navigate = useNavigate();
    
    
  // form submit handler
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_LINK}/api/v1/auth/forgot-password`,
        {email,newpassword,answer}
      );
      if(res&&res.data.success){
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
    <Layout title='Forgot Password- E-Commerce App'>
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
            {/* <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id
            </label> */}
            <input
              type="text"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Name of your Favourite Sport?"
              required
            />
          </div>
          
          <div className="mb-3">
            {/* <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label> */}
            <input
              type="password"
              value={newpassword}
              onChange={(e)=>setnewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your new Password"
              required
            />
          </div>
         
         

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Forgot_Password