import React from 'react';
import './Shop.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
// Assets
import Product1 from '../../assets/Full-Fit.jpg';
import Product2 from '../../assets/jacket.svg';
import Product3 from '../../assets/jeans.svg';
// Swiper stuff
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Shop() {
  const products = [
    {
      id: 1,
      name: 'Denim Campaign Full Fit',
      price: 45000,
      image: Product1,
      sizes: ['M', 'L', 'XL'],
      imageDimensions: { height: '100%', width: '100%', objectFit: 'cover' },
    },
    {
      id: 2,
      name: 'Denim Campaign Jacket',
      price: 45000,
      image: Product2,
      sizes: ['M', 'L', 'XL'],
      imageDimensions: { height: '100%', width: '100%' },
    },
    {
      id: 3,
      name: 'Denim Campaign Jeans',
      price: 45000,
      image: Product3,
      sizes: ['28', '30', '32', '34'],
      imageDimensions: { height: '100%', width: '100%', objectFit: 'cover' },
    },
  ];

  return (
    <div className="shop-body-container">
      <Header />
      <div className="shop-section section-2" id="products-section">
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
                image_dimensions={product.imageDimensions}
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
