import './Product.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Context from '../../Context/Context';

import Product1 from '../../assets/full-fit.svg';
import Product2 from '../../assets/jacket.svg';
import Product3 from '../../assets/jeans.svg';
import Hero from '../../assets/denim-jeans.webp';

// Swiper stuff
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Product() {
  const { product } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(Context);

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeJustAdded, setSizeJustAdded] = useState(false);
  const [buttonText, setButtonText] = useState('ADD TO CART');

  const sizes = ['M', 'L', 'XL', '2XL'];

  let product_title;
  let product_image = '';
  let product_price = '45,000 UGX';

  const productInfo = {
    0: {
      title: 'Denim Campaign Full Fit',
      price: '45,000 UGX',
      image: Product1,
    },
    1: { title: 'Denim Campaign Jacket', price: '45,000 UGX', image: Product2 },
    2: { title: 'Denim Campaign Jeans', price: '45,000 UGX', image: Product3 },
  };

  if (product === 'denim-campaign-full-fit') {
    ({
      title: product_title,
      image: product_image,
      price: product_price,
    } = productInfo[0]);
  } else if (product === 'denim-campaign-jacket') {
    ({
      title: product_title,
      image: product_image,
      price: product_price,
    } = productInfo[1]);
  } else if (product === 'denim-campaign-jeans') {
    ({
      title: product_title,
      image: product_image,
      price: product_price,
    } = productInfo[2]);
  }

  const isBigIcon =
    product_title === productInfo[0].title ||
    product_title === productInfo[2].title;

  const handleAddToCart = () => {
    const sanitizedPrice = parseInt(
      product_price
        .toString()
        .replace(/UGX\s*/gi, '')
        .replace(/[^0-9]/g, ''),
      10
    );

    const productObj = {
      title: product_title,
      price: sanitizedPrice,
      image: product_image.split('?')[0],
      quantity: 1,
      size: selectedSize || sizes[0],
    };

    if (ctx.setAnimateCart) {
      ctx.setAnimateCart(true);
      setTimeout(() => {
        ctx.setAnimateCart(false);
      }, 1000);
    }

    const existingCartItems =
      JSON.parse(localStorage.getItem('CartItems')) || [];
    const existingProductIndex = existingCartItems.findIndex(
      (item) => item.title === productObj.title && item.size === productObj.size
    );

    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].quantity += 1;
    } else {
      existingCartItems.push(productObj);
    }

    localStorage.setItem('CartItems', JSON.stringify(existingCartItems));

    setSizeJustAdded(true);
    setTimeout(() => {
      setSelectedSize('');
      setSizeJustAdded(false);
    }, 100);

    setButtonText('ADDED!');
    setTimeout(() => {
      setButtonText('ADD TO CART');
    }, 2000);
  };

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
                {[1, 2, 3].map((_, i) => (
                  <SwiperSlide key={i}>
                    <img
                      alt="product-hero"
                      src={Hero}
                      className="product-swiper-image"
                    />
                  </SwiperSlide>
                ))}
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

              {/* Size Buttons */}
              <div className="product-sizes">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      console.log('Size selected:', size); // Debug log for size selection
                    }}
                    className={`size-buttons ${
                      selectedSize === size && !sizeJustAdded
                        ? 'border-black shadow-[0_0_0_2px_black]' // Permanent hover style
                        : 'border-zinc-600 text-gray-300 hover:border-black hover:shadow-[0_0_0_2px_black]'
                    } transition-all duration-250`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Buttons */}
              <div className="product-buttons">
                <button className="add-to-cart" onClick={handleAddToCart}>
                  {buttonText}
                </button>
                <button className="see-all" onClick={() => navigate('/shop')}>
                  SEE ALL
                </button>
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
