import React from "react";
import Layout from "./../components/Layout";

const About = () => {
  return (
    <Layout title={"About us - E-Commerce App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2" style={{fontSize:"18px"}}>
          Welcome to our "E-Commerce Store", where we redefine online shopping to bring you the best in convenience, quality, and value. Our mission is to provide a seamless and enjoyable shopping experience, offering a diverse range of products to cater to all your needs. With a commitment to customer satisfaction, we prioritize top-notch service, secure transactions, and timely deliveries. Whether you're looking for the latest fashion trends, cutting-edge electronics, or everyday essentials, we have it all in one place. Join us in our journey to make online shopping not just a necessity, but a delightful experience.
           <br/><br/> Once again thank you for choosing "E-Commerce Store" - where your satisfaction is our success.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;