import React from "react";
import "./Home.css";

// Components
import Header from "../../components/Navbar/Header";
import ProductCard from "../../components/ProductCard/ProductCard";

// Assets
import Product1 from "../../assets/full-fit.svg";
import Product2 from "../../assets/jacket.svg";
import Product3 from "../../assets/denim-jeans.svg";

// Swiper stuff
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  return (
    <div className="Body-container">
      <Header />

      <div className="Black-box-tilted"></div>
      <div className="section-1"></div>

      <div className="SB-text-container">
        <div className="SB-text-div">
          <div className="speedball-text" />
          <button className="button">Shop Apparel</button>
        </div>
      </div>

      {/* 🌀 Swiper Carousel */}
      <div className="section-2">
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
              image_dimensions={{ height: "auto", width: "100%" }}
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

      <div className="section-3">
        <div className="Blue-box" />

        <div className="section-3-container">
          <div className="speedball-logo-and-text-container">
            <div className="speedball-logo" />
            <p
              style={{ paddingBottom: "20px", textAlign: "justify", margin: 0 }}
            >
              Rooted in the energy of the streets, our brand is built for those
              who move against the grain, challenge norms, and carve out their
              own space in the world.
            </p>
            <button className="button">ABOUT US</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
