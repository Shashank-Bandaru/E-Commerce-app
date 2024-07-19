import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import Layout from "../../components/Layout";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import '../../styles/AdminProductstyles.css'
const Products = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation()
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_LINK}/api/v1/product/list`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, [location.key]);

  return (
    <Layout title={"Dashboard - Products List"}>
    <div className="container-fluid m-3 p-3 product-page" style={{maxHeight:"100vh",overflow: "auto"}}>
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className="d-flex flex-wrap">
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              className="product-link"
            >
              <div className="card m-2" style={{ width: "18rem"}}>
                <img
                  src={`${process.env.REACT_APP_LINK}/api/v1/product/product-image/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-price"> ₹ {p.price}</p>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 50)}...
                  </p>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>  
  </Layout>
  );
};

export default Products;