import React from "react";
import "./Home.css";
import Header from "../../components/Navbar/Header";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Product1 from "../../assets/full-fit.svg";
import Product2 from "../../assets/jacket.svg";
import Product3 from "../../assets/denim-jeans.svg";

function Home() {
  return (
    <div className="Body-container">
      <Header />
      <div className="Black-box-tilted"></div>
      <div className="section-1"></div>

      <div className="SB-text-container">
        <div className="SB-text-div">
          <div className="speedball-text" />
          <button className="Shop-button">Shop Apparel</button>
        </div>
      </div>

      {/* turn this into a spinning carousel */}
      <div className="section-2">
        {/* <h1>Shop Apparel</h1> */}
        <ProductCard
          product="Denim Campaign Full Fit"
          price="UGX 45,000"
          image={Product1}
        />
        <ProductCard
          product="Denim Campaign Jacket"
          price="UGX 45,000"
          image={Product2}
          image_dimensions={{ height: "auto", width: "100%" }}
        />
        <ProductCard
          product="Denim Campaign Jeans"
          price="UGX 45,000"
          image={Product3}
          image_dimensions={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="section-1" />
      <Footer />
    </div>
  );
}

export default Home;
