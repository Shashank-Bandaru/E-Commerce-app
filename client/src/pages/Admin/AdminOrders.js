import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "delivered",
    "cancelled",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [remove, setremove] = useState(false);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_LINK}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_LINK}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      if(value==="cancelled") setremove(true);
      else{
        setremove(false);
      }
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async(orderId)=>{
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_LINK}/api/v1/auth/order-delete/${orderId}`
      );
      if (data.success) {
        toast.success(`Order has been deleted successfully`);

        getOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>All Orders</h1>
          {(orders.length===0)?<p style={{fontSize:"20px"}}>Order list is empty. If new orders are placed then their details will be displayed here.</p>:
          <div  style={{maxHeight:"60vh",overflow: "auto"}}> 
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                <table className="table">
                  <thead>
                    <tr key={i}>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                      {(remove)?<th scope="col">Action</th>:<></>}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                           variant="borderless"
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                      {(remove)?<td><button
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(o?._id);
                            }}
                          >
                            Delete
                          </button></td>:<></>}
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" style={{width:"100%"}} key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_LINK}/api/v1/product/product-image/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="40px"
                          height={"auto"}
                        />
                      </div>
                      <div className="col-md-8">
                      <p>
                            <b>Name : </b>
                            {p.name}
                          </p>
                          <p>
                            <b>Description : </b>
                            {p.description.substring(0, 230)}....
                          </p>
                          <p>
                            <b>Price : </b>₹{p.price}
                          </p>
                      </div>
                    </div>
                  ))}
                  
                  
                </div>
              </div>
            );
          })}
          </div>}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
