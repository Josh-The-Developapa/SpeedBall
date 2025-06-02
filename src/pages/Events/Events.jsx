import React from 'react';
import './Events.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Events() {
  return (
    <div className="events-body-container">
      <Header />
      <div className="events-hero"></div>
      <div className="events-text-wrapper">
        <div className="events-text-block">
          <div className="events-icon" />
          <div className="events-button-container">
            <button className="events-button" id="buy-tickets-button">
              Buy Tickets
            </button>
            <button className="events-button" id="shop-merch-button">
              Shop Merch
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Events;
