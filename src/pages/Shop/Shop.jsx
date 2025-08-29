import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './Shop.css';
import { Context } from '../../Context/Context';
import { productsData, swiperConfig } from '../../data/productData.jsx';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';

function Shop() {
  const ctx = useContext(Context);

  return (
    <div className="shop-body-container">
      <Header />

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

      <Footer />
    </div>
  );
}

export default Shop;
