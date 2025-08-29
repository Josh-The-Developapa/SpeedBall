import React, { useContext } from 'react';
import './Shop.css';
import { Context } from '../../Context/Context';
// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../../components/ProductCard/ProductCard';
// Assets
import Product3 from '../../assets/Black-Jacket.jpg';
import Product4 from '../../assets/Brown-Jacket.jpg';
import Product5 from '../../assets/Black-pants.png';
import Product6 from '../../assets/Brown-Pants.jpg';
import Product7 from '../../assets/Brown-Jorts.png';
import Product8 from '../../assets/White-Tank.png';

// Second Product Images
import Product10 from '../../assets/Brown-Jacket2.png';
import Product11 from '../../assets/Black-pants2.png';
import Product12 from '../../assets/Black-Jacket2.jpg';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Shop() {
  const ctx = useContext(Context);

  // Organized product data with multiple images for each product
  const products = [
    {
      id: 3,
      name: 'Black Jacket',
      price: 60000,
      images: [Product12, Product3], // Multiple images
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 4,
      name: 'Brown Jacket',
      price: 60000,
      images: [Product4, Product10], // Multiple images
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 5,
      name: 'Black Pants',
      price: 60000,
      images: [Product5, Product11], // Multiple images
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 6,
      name: 'Brown Pants',
      price: 60000,
      images: [Product6], // Single image
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 7,
      name: 'Brown Jorts',
      price: 60000,
      images: [Product7], // Single image
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 8,
      name: 'Tank Top',
      price: 35000,
      images: [Product8], // Single image
      sizes: ['S', 'M', 'L'],
    },
  ];

  return (
    <div className="shop-body-container">
      <Header />

      {/* Product Carousel - copied from Home section-2 */}
      <div className="shop-section section-2" id="products-section">
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

      <Footer />
    </div>
  );
}

export default Shop;
