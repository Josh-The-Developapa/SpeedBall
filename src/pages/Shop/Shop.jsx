import React from "react";
import "./Shop.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import ProductCard from "../../components/ProductCard/ProductCard";
// Assets
import Product1 from "../../assets/full-fit.svg";
import Product2 from "../../assets/jacket.svg";
import Product3 from "../../assets/jeans.svg";

// Swiper stuff
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Shop() {
  return (
    <div className="shop-body-container">
      <Header />
      <div className="shop-section">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          loop={10}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="product-swiper"
        >
          <SwiperSlide>
            <ProductCard
              product="Denim Campaign Full Fit"
              price="UGX 45,000"
              image={Product1}
            />
          </SwiperSlide>

          <SwiperSlide>
            <ProductCard
              product="Denim Campaign Jacket"
              price="UGX 45,000"
              image={Product2}
              image_dimensions={{
                height: "100%",
                width: "100%",
              }}
            />
          </SwiperSlide>

          <SwiperSlide>
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
          </SwiperSlide>
        </Swiper>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
