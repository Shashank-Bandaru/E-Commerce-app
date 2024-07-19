import React from "react";
import Layout from "../components/Layout";
import { useSearch } from "../context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart_context";
import { toast } from "react-toastify";
import "../styles/AdminProductstyles.css";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
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
                  
                  <div className="card-name-price" style={{flexWrap:"nowrap"}}>

                  <button
                    className="btn btn-primary ms-1"
                    id="more_details_btn"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    id="add_to_cart_btn"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
