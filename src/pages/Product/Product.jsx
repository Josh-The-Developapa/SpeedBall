import React, { useContext, useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './Product.css';
import Context from '../../Context/Context';
import {
  productsData,
  brandAssets,
  brandContent,
} from '../../data/productData.jsx';

// Components
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Product() {
  const { product } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(Context);

  const [selectedSize, setSelectedSize] = useState('');
  const [sizeJustAdded, setSizeJustAdded] = useState(false);
  const [buttonText, setButtonText] = useState('ADD TO CART');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find current product based on URL parameter
  const currentProduct = useMemo(() => {
    const foundProduct = productsData.find((p) => p.urlName === product);
    return (
      foundProduct || {
        id: 0,
        name: 'Product Not Found',
        urlName: 'not-found',
        price: 0,
        images: [brandAssets.logo],
        sizes: ['M', 'L', 'XL'],
      }
    );
  }, [product]);

  // Initialize selectedSize with first available size
  React.useEffect(() => {
    if (!selectedSize && currentProduct.sizes.length > 0) {
      setSelectedSize(currentProduct.sizes[0]);
    }
  }, [currentProduct.sizes, selectedSize]);

  // Handle image switching
  const handleImageClick = useCallback(() => {
    if (currentProduct.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }
  }, [currentProduct.images.length]);

  // Get current images
  const getFrontImage = useCallback(() => {
    return currentProduct.images[currentImageIndex] || brandAssets.logo;
  }, [currentProduct.images, currentImageIndex]);

  const getBackImage = useCallback(() => {
    if (currentProduct.images.length > 1) {
      const backIndex = currentImageIndex === 0 ? 1 : 0;
      return currentProduct.images[backIndex] || brandAssets.logo;
    }
    return currentProduct.images[0] || brandAssets.logo;
  }, [currentProduct.images, currentImageIndex]);

  // Handle add to cart
  const handleAddToCart = useCallback(() => {
    const productObj = {
      id: currentProduct.id,
      title: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.images[0]?.split('?')[0] || brandAssets.logo,
      quantity: 1,
      size: selectedSize || currentProduct.sizes[0],
    };

    // Animate cart if function exists
    if (ctx.setAnimateCart) {
      ctx.setAnimateCart(true);
      setTimeout(() => ctx.setAnimateCart(false), 1000);
    }

    // Save to localStorage
    try {
      const existingCartItems =
        JSON.parse(localStorage.getItem('CartItems')) || [];
      const existingProductIndex = existingCartItems.findIndex(
        (item) =>
          item.title === productObj.title && item.size === productObj.size
      );

      if (existingProductIndex !== -1) {
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        existingCartItems.push(productObj);
      }

      localStorage.setItem('CartItems', JSON.stringify(existingCartItems));
    } catch (error) {
      console.error('Error saving to cart:', error);
    }

    // UI feedback
    setSizeJustAdded(true);
    setTimeout(() => {
      setSelectedSize('');
      setSizeJustAdded(false);
    }, 100);

    setButtonText('ADDED!');
    setTimeout(() => setButtonText('ADD TO CART'), 2000);
  }, [currentProduct, selectedSize, ctx]);

  // Handle size selection
  const handleSizeSelect = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const canSwitchImages = currentProduct.images.length > 1;
  const cursorStyle = canSwitchImages ? 'pointer' : 'default';

  return (
    <div className="products-body-container">
      <Header />
      <div className="products-bg">
        <div className="product-section">
          {/* Desktop Layout - Left Images */}
          <div className="desktop-image-container">
            <div className="desktop-image-stack">
              <img
                src={getBackImage()}
                alt={`${currentProduct.name} back view`}
                className="desktop-product-image desktop-image-back clickable-image"
                onClick={handleImageClick}
                style={{ cursor: cursorStyle }}
              />
              <img
                src={getFrontImage()}
                alt={`${currentProduct.name} front view`}
                className="desktop-product-image desktop-image-front clickable-image"
                onClick={handleImageClick}
                style={{ cursor: cursorStyle }}
              />
            </div>
          </div>

          {/* Desktop Layout - Right Content */}
          <div className="desktop-product-info">
            <img
              src={brandAssets.logo}
              alt="Brand Logo"
              className="brand-logo"
            />
            <h2 className="product-title">
              {currentProduct.name.toUpperCase()}
            </h2>
            <p className="product-price">
              UGX {currentProduct.price.toLocaleString()}
            </p>
            <p className="product-description">
              {brandContent.productDescription}
            </p>

            {/* Size Buttons */}
            <div className="product-sizes">
              {currentProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`size-buttons ${
                    selectedSize === size && !sizeJustAdded
                      ? 'size-selected'
                      : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="product-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                {buttonText}
              </button>
              <button className="see-all" onClick={() => navigate('/shop')}>
                SHOP ALL
              </button>
            </div>
          </div>

          {/* Mobile Layout - Swiper */}
          <div className="mobile-swiper-container">
            <Swiper
              modules={[Pagination]}
              spaceBetween={30}
              loop={currentProduct.images.length > 1}
              pagination={{ clickable: true }}
              slidesPerView={1}
              className="product-page-swiper"
            >
              {currentProduct.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    alt={`${currentProduct.name} - Image ${index + 1}`}
                    src={image}
                    className="product-swiper-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Mobile Layout - Product Info */}
          <div className="mobile-product-info">
            <img
              src={brandAssets.logo}
              alt="Brand Logo"
              className="brand-logo"
            />
            <h2 className="product-title">
              {currentProduct.name.toUpperCase()}
            </h2>
            <p className="product-price">
              UGX {currentProduct.price.toLocaleString()}
            </p>
            <p className="product-description">
              {brandContent.productDescription}
            </p>

            {/* Size Buttons */}
            <div className="product-sizes">
              {currentProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`size-buttons ${
                    selectedSize === size && !sizeJustAdded
                      ? 'size-selected'
                      : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="product-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                {buttonText}
              </button>
              <button className="see-all" onClick={() => navigate('/shop')}>
                SHOP ALL
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product;
