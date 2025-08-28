import './Product.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Context from '../../Context/Context';

// Assets from Home/Shop
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
import RandomShi from '../../assets/rando-shi.png';

// Default Hero for products without specific images
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // New state for image switching

  // Product data from Home/Shop (synchronized)
  const productsData = [
    {
      id: 3,
      name: 'Black Jacket',
      urlName: 'black-jacket',
      price: 60000,
      images: [Product12, Product3],
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 4,
      name: 'Brown Jacket',
      urlName: 'brown-jacket',
      price: 60000,
      images: [Product4, Product10],
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 5,
      name: 'Black Pants',
      urlName: 'black-pants',
      price: 60000,
      images: [Product5, Product11],
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 6,
      name: 'Brown Pants',
      urlName: 'brown-pants',
      price: 60000,
      images: [Product6],
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 7,
      name: 'Brown Jorts',
      urlName: 'brown-jorts',
      price: 60000,
      images: [Product7],
      sizes: ['L', 'XL', 'XXL'],
    },
    {
      id: 8,
      name: 'Tank Top',
      urlName: 'tank-top',
      price: 35000,
      images: [Product8],
      sizes: ['S', 'M', 'L'],
    },
  ];

  // Find current product based on URL parameter
  const currentProduct = productsData.find((p) => p.urlName === product) || {
    id: 0,
    name: 'Product Not Found',
    urlName: 'not-found',
    price: 0,
    images: [Hero],
    sizes: ['M', 'L', 'XL'],
  };

  // Initialize selectedSize with first available size
  useState(() => {
    if (!selectedSize && currentProduct.sizes.length > 0) {
      setSelectedSize(currentProduct.sizes[0]);
    }
  }, [currentProduct.sizes]);

  // Function to handle image switching
  const handleImageClick = () => {
    if (currentProduct.images.length > 1) {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
    }
  };

  // Get current front and back images based on currentImageIndex
  const getFrontImage = () => {
    return currentProduct.images[currentImageIndex] || Hero;
  };

  const getBackImage = () => {
    if (currentProduct.images.length > 1) {
      const backIndex = currentImageIndex === 0 ? 1 : 0;
      return currentProduct.images[backIndex] || Hero;
    }
    return currentProduct.images[0] || Hero;
  };

  const handleAddToCart = () => {
    const sanitizedPrice = currentProduct.price;

    const productObj = {
      id: currentProduct.id,
      title: currentProduct.name,
      price: sanitizedPrice,
      image: currentProduct.images[0].split('?')[0],
      quantity: 1,
      size: selectedSize || currentProduct.sizes[0],
    };

    if (ctx.setAnimateCart) {
      ctx.setAnimateCart(true);
      setTimeout(() => {
        ctx.setAnimateCart(false);
      }, 1000);
    }

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
          {/* Desktop Layout - Left Images */}
          <div className="desktop-image-container">
            <div className="desktop-image-stack">
              <img
                src={getBackImage()}
                alt={`${currentProduct.name} back view`}
                className="desktop-product-image desktop-image-back clickable-image"
                onClick={handleImageClick}
                style={{
                  cursor:
                    currentProduct.images.length > 1 ? 'pointer' : 'default',
                }}
              />
              <img
                src={getFrontImage()}
                alt={`${currentProduct.name} front view`}
                className="desktop-product-image desktop-image-front clickable-image"
                onClick={handleImageClick}
                style={{
                  cursor:
                    currentProduct.images.length > 1 ? 'pointer' : 'default',
                }}
              />
            </div>
          </div>

          {/* Desktop Layout - Right Content */}
          <div className="desktop-product-info">
            <img src={RandomShi} alt="Random-Shi" className="brand-logo" />
            <h2 className="product-title">
              {currentProduct.name.toUpperCase()}
            </h2>
            <p className="product-price">
              UGX {currentProduct.price.toLocaleString()}
            </p>
            <p className="product-description">
              Rooted in the energy of the streets, our brand is built for those
              who move against the grain, challenge norms, and carve out their
              own space in the world. Premium quality materials meet
              street-inspired design.
            </p>

            {/* Size Buttons */}
            <div className="product-sizes">
              {currentProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    console.log('Size selected:', size);
                  }}
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

            {/* Buttons */}
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
            <img src={RandomShi} alt="Random-Shi" className="brand-logo" />
            <h2 className="product-title">
              {currentProduct.name.toUpperCase()}
            </h2>
            <p className="product-price">
              UGX {currentProduct.price.toLocaleString()}
            </p>
            <p className="product-description">
              Rooted in the energy of the streets, our brand is built for those
              who move against the grain, challenge norms, and carve out their
              own space in the world. Premium quality materials meet
              street-inspired design.
            </p>

            {/* Size Buttons */}
            <div className="product-sizes">
              {currentProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    console.log('Size selected:', size);
                  }}
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

            {/* Buttons */}
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
