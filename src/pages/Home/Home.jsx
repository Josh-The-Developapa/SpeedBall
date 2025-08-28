import React, { useContext } from 'react';
import './Home.css';
import { Context } from '../../Context/Context';
// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
// Assets
import YourModelImage from '../../assets/RS4.png';
import RandomShi from '../../assets/rando-shi.png';
// import Product1 from '../../assets/Black-Full-Fit.jpg';
// import Product2 from '../../assets/Brown-Full-Fit.jpg';
import Product3 from '../../assets/Black-Jacket.jpg';
import Product4 from '../../assets/Brown-Jacket.jpg';
import Product5 from '../../assets/Black-pants.png';
import Product6 from '../../assets/Brown-Pants.jpg';
import Product7 from '../../assets/Brown-Jorts.png';
import Product8 from '../../assets/Tank.png';

// Second Product Images
import Product10 from '../../assets/Brown-Jacket2.png';
import Product11 from '../../assets/Black-pants2.png';
import Product12 from '../../assets/Black-Jacket2.jpg';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// React Router
import { Link } from 'react-router-dom';

function Home() {
  const ctx = useContext(Context);

  // Organized product data with multiple images for each product
  const products = [
    // {
    //   id: 1,
    //   name: 'Black Full Fit',
    //   price: 120000,
    //   images: [Product1], // Add more images as array when available
    //   sizes: ['L', 'XL', 'XXL'],
    // },
    // {
    //   id: 2,
    //   name: 'Brown Full Fit',
    //   price: 120000,
    //   images: [Product2], // Add more images as array when available
    //   sizes: ['L', 'XL', 'XXL'],
    // },
    {
      id: 3,
      name: 'Black Jacket',
      price: 60000,
      images: [Product12, Product3], // Add more images as array when available
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 4,
      name: 'Brown Jacket',
      price: 60000,
      images: [Product4, Product10], // Add more images as array when available
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 5,
      name: 'Black Pants',
      price: 60000,
      images: [Product5, Product11], // Add more images as array when available
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 6,
      name: 'Brown Pants',
      price: 60000,
      images: [Product6], // Add more images as array when available
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 7,
      name: 'Brown Jorts',
      price: 60000,
      images: [Product7], // Add more images as array when available
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 8,
      name: 'Tank Top',
      price: 35000,
      images: [Product8], // Add more images as array when available
      sizes: ['S', 'M', 'L'],
    },
  ];

  return (
    <div className="body-container">
      <Header />

      {/* Hero Section */}
      <div className="section-1"></div>

      {/* Product Carousel */}
      <div className="section-2" id="products-section">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass:
              'swiper-pagination-bullet-active custom-bullet-active',
          }}
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
            <img src={YourModelImage} alt="Campaign Models" />
          </div>
          <div className="speedball-logo-and-text-container">
            <img src={RandomShi} className="speedball-logo" />
            <p className="section-3-text">
              Rooted in the energy of the streets, our brand is built for those
              who move against the grain, challenge norms, and carve out their
              own space in the world.
            </p>
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
