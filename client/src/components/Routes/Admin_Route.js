import { useState,useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import Spinner from '../spinner.js';
import {toast} from 'react-toastify'


export default function Admin_Route(){
    const [ok,setOk] = useState(false);
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const authCheck  = async()=>{
            try{
            const res = await axios.get(`${process.env.REACT_APP_LINK}/api/v1/auth/admin-auth`);
            if(res?.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }catch (error) {
            if (error.response && error.response.status === 401) {
                setOk(false);
                toast.error("Unauthorized Access\nOnly Admin can Access this page");
            } else {
                console.error(error);
            }
        }
    };
        if(auth?.token) authCheck()
    },[auth?.token])
    return ok? <Outlet/>:<Spinner path=''/>;

}