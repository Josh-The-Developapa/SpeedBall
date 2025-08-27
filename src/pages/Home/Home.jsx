import React, { useContext } from 'react';
import './Home.css';
import { Context } from '../../Context/Context';
// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
// Assets
import YourModelImage from '../../assets/RS2.jpg';
import RandomShi from '../../assets/rando-shi.png';
import Product1 from '../../assets/Black-Denim-Full-Fit.jpg';
import Product2 from '../../assets/JACKET2.png';
import Product3 from '../../assets/PANTS.png';
import Product4 from '../../assets/JORTS.png';
import Product5 from '../../assets/TANK 1.png';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
// React Router
import { Link } from 'react-router-dom';

function Home() {
  const ctx = useContext(Context);
  const products = [
    {
      id: 1,
      name: 'Black Denim Full Fit',
      price: 120000,
      image: Product1,
      sizes: ['M', 'L', 'XL'],
      hoverPic: Product1,
      imageDimensions: { height: '100%', width: '100%', objectFit: 'cover' },
    },
    {
      id: 2,
      name: 'Leather Jacket',
      price: 60000,
      image: Product2,
      sizes: ['M', 'L', 'XL'],
    },
    {
      id: 3,
      name: 'Pants',
      price: 60000,
      image: Product3,
      sizes: ['28', '30', '32', '34'],
    },
    {
      id: 4,
      name: 'Jorts',
      price: 60000,
      image: Product4,
      sizes: ['28', '30', '32', '34'],
    },
    {
      id: 5,
      name: 'Tank Top',
      price: 35000,
      image: Product5,
      sizes: ['28', '30', '32', '34'],
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
          modules={[Autoplay, Pagination]}
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
                product={product.name}
                price={product.price.toLocaleString('en-US')}
                image={product.image}
                hoverPic={product.hoverPic}
                image_dimensions={product.imageDimensions}
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
