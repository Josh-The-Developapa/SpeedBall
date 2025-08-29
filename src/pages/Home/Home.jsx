import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './Home.css';
import { Context } from '../../Context/Context';
import {
  productsData,
  brandAssets,
  swiperConfig,
  brandContent,
} from '../../data/productData.jsx';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';

function Home() {
  const ctx = useContext(Context);

  return (
    <div className="body-container">
      <Header />

      {/* Hero Section */}
      <div className="section-1"></div>

      {/* Product Carousel */}
      <div className="section-2" id="products-section">
        <Swiper
          modules={[Pagination]}
          {...swiperConfig}
          className="product-swiper"
        >
          {productsData.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                id={product.id}
                product={product.name}
                price={product.price}
                images={product.images}
                sizes={product.sizes}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About / Branding Section */}
      <div className="section-3">
        <div className="section-3-container">
          <div className="section-3-image">
            <img src={brandAssets.modelImage} alt="Campaign Models" />
          </div>
          <div className="speedball-logo-and-text-container">
            <img
              src={brandAssets.logo}
              className="speedball-logo"
              alt="Brand Logo"
            />
            <p className="section-3-text">{brandContent.description}</p>
            <Link to="/about" className="button">
              Explore Collection
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
