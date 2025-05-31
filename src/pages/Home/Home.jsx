import React, { useContext } from "react";
import "./Home.css";
import { Context } from "../../Context/Context";

// Components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";

// Assets
import Product1 from "../../assets/full-fit.svg";
import Product2 from "../../assets/jacket.svg";
import Product3 from "../../assets/denim-jeans.svg";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Home() {
  const ctx = useContext(Context);

  const products = [
    {
      id: 1,
      name: "Denim Campaign Full Fit",
      price: 45000,
      image: Product1,
      sizes: ["M", "L", "XL"],
      hoverPic: Product1, // Add alternative image if available
    },
    {
      id: 2,
      name: "Denim Campaign Jacket",
      price: 45000,
      image: Product2,
      sizes: ["M", "L", "XL"],
      imageDimensions: { height: "auto", width: "100%" },
    },
    {
      id: 3,
      name: "Denim Campaign Jeans",
      price: 45000,
      image: Product3,
      sizes: ["28", "30", "32", "34"],
      imageDimensions: { height: "100%", width: "100%", objectFit: "cover" },
    },
  ];

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

      {/* Product Carousel */}
      <div className="section-2">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          // loop={true}
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
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product.name}
                price={`UGX ${product.price.toLocaleString("en-US")}`}
                image={product.image}
                hoverPic={product.hoverPic}
                image_dimensions={product.imageDimensions}
                sizes={product.sizes}
              />
            </SwiperSlide>
          ))}
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
      <Footer />
    </div>
  );
}

export default Home;
