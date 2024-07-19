import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children ,title="E-Commerce App - shop now",
  description="This is my first MERN stack project.It is an E Commerce application model",
  keywords="MERN,React,Node,MongoDB",
  author='Shashank Bandaru'}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author}/>

        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        
        {children}</main>
      <Footer />
    </div>
  );
};

// Layout.defaultProps = {
//   title:"E-Commerce App - shop now",
//   description:"This is my first MERN stack project.It is an E Commerce application model",
//   keywords:"MERN,React,Node,MongoDB",
//   author:'Shashank Bandaru',
// };

export default Layout;
