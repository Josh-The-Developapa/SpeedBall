import React from 'react';
import './Home.css';
import Header from '../../components/Navbar/Header';

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

      <div className="section-2" />

      <div className="section-1" />
    </div>
  );
}

export default Home;
