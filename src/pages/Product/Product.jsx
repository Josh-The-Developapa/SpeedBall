import './Product.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useParams } from 'react-router-dom';
import Product1 from '../../assets/full-fit.svg';
import Product2 from '../../assets/jacket.svg';
import Product3 from '../../assets/jeans.svg';
import Hero from '../../assets/denim-jeans.svg';
// Swiper stuff
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Product() {
  const { product } = useParams();

  let product_title;
  let product_image = '';

  const productInfo = {
    0: {
      title: 'Denim Campaign Full Fit',
      price: '45,000 UGX',
      image: Product1,
    },
    1: {
      title: 'Denim Campaign Jacket',
      price: '45,000 UGX',
      image: Product2,
    },
    2: {
      title: 'Denim Campaign Jeans',
      price: '45,000 UGX',
      image: Product3,
    },
  };

  if (product === 'denim-campaign-full-fit') {
    product_title = productInfo[0].title;
    product_image = productInfo[0].image;
  } else if (product === 'denim-campaign-jacket') {
    product_title = productInfo[1].title;
    product_image = productInfo[1].image;
  } else if (product === 'denim-campaign-jeans') {
    product_title = productInfo[2].title;
    product_image = productInfo[2].image;
  }

  const isBigIcon =
    product_title == productInfo[0].title ||
    product_title == productInfo[2].title;

  return (
    <div className="products-body-container">
      <Header />
      <div className="products-bg">
        <div className="product-section">
          <div className="image-container">
            <img
              src={Hero}
              alt="Denim Jacket 1"
              className="product-image image-back"
            />
            <img
              src={Hero}
              alt="Denim Jacket 2"
              className="product-image image-front"
            />
          </div>
          <div className="product-info-container">
            <div className="product-page-swiper-container">
              <Swiper
                modules={[Pagination]}
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className="product-page-swiper"
              >
                <SwiperSlide>
                  <img
                    alt="product-hero"
                    src={Hero}
                    className="product-swiper-image"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    alt="product-hero"
                    src={Hero}
                    className="product-swiper-image"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    alt="product-hero"
                    src={Hero}
                    className="product-swiper-image"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="product-info">
              <img
                src={product_image}
                alt="Jacket Icon"
                className={`product-icon ${isBigIcon ? 'big-icon' : ''}`}
                style={{ marginBottom: isBigIcon ? '100px' : '0px' }}
              />
              <h2 className="product-title">{product_title.toUpperCase()}</h2>
              <p className="product-description">
                Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus.
              </p>
              <div className="product-sizes">
                <button className="size-buttons">M</button>
                <button className="size-buttons">L</button>
                <button className="size-buttons">XL</button>
                <button className="size-buttons">2XL</button>
              </div>
              <div className="product-buttons">
                <button className="add-to-cart">ADD TO CART</button>
                <button className="see-all">SEE ALL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
