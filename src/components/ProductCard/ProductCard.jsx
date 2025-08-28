import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
// import Context from '../../Context/Context';

export default function ProductCard(props) {
  // const ctx = useContext(Context);
  const navigate = useNavigate();

  // Format product name for URL
  const productFormattedName =
    props.product?.replace(/\s+/g, '-').toLowerCase() || 'sample-product';

  // State management
  const [selectedSize, setSelectedSize] = useState('');
  const [showAdded, setShowAdded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use sizes from props or fallback to default
  const availableSizes = props.sizes || ['S', 'M', 'L', 'XL'];

  // Handle multiple images - use images array from props or fallback to single image
  const productImages = props.images || [
    props.image ||
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop',
  ];

  // Initialize selectedSize with first available size
  useState(() => {
    if (!selectedSize && availableSizes.length > 0) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes]);

  // Image navigation handlers
  const nextImage = (e) => {
    e.stopPropagation();
    if (productImages.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (productImages.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? productImages.length - 1 : prev - 1
      );
    }
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  // Cart functionality
  const handleAddToCart = (e) => {
    e.stopPropagation();

    const sanitizedPrice = parseInt(
      (props.price || 25000)
        .toString()
        .replace(/UGX\s*/gi, '')
        .replace(/[^0-9]/g, ''),
      10
    );

    const product = {
      id: props.id || Math.random().toString(36).substr(2, 9),
      title: props.product || 'Sample Product',
      price: sanitizedPrice,
      image: productImages[0].split('?')[0],
      quantity: 1,
      size: selectedSize || availableSizes[0],
    };

    try {
      const existingCartItems =
        JSON.parse(localStorage.getItem('CartItems')) || [];
      const existingProductIndex = existingCartItems.findIndex(
        (item) => item.title === product.title && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        existingCartItems[existingProductIndex].quantity += 1;
      } else {
        existingCartItems.push(product);
      }

      localStorage.setItem('CartItems', JSON.stringify(existingCartItems));
      console.log('Added to cart:', product);
    } catch (error) {
      console.error('Error saving to cart:', error);
    }

    // Show added animation
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  // Navigation to product detail page
  const handleProductClick = () => {
    if (navigate) {
      navigate(`/product/${productFormattedName}`);
    } else {
      console.log('Navigate to:', `/product/${productFormattedName}`);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Image Container with Mini Carousel */}
      <div className="relative w-full overflow-hidden group">
        <img
          src={productImages[currentImageIndex]}
          alt={`${props.product} - Image ${currentImageIndex + 1}`}
          onClick={handleProductClick}
          className="w-full h-[400px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        />

        {/* Navigation arrows - only show if multiple images */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-75"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-opacity-75"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image indicators - only show if multiple images */}
        {productImages.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-1">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentImageIndex ? 'bg-black' : 'hover:bg-gray-500'
                }`}
                style={{
                  backgroundColor:
                    index === currentImageIndex ? '#000000' : '#D9D9D9',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Title */}
      <h2
        onClick={handleProductClick}
        className="text-lg sm:text-xl font-normal text-black mb-2 mt-[15px] cursor-pointer hover:text-gray-700 transition-colors duration-200 line-clamp-2"
      >
        {props.product || 'Sample Product'}
      </h2>

      {/* Price */}
      <p className="text-gray-600 text-sm sm:text-base font-medium mb-4 sm:mb-6">
        UGX{' '}
        {typeof props.price === 'number'
          ? props.price.toLocaleString('en-US')
          : props.price || '25,000'}
      </p>

      {/* Sizes and Cart Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Size Buttons */}
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              style={{ borderRadius: '0px' }}
              className={`
                px-2 sm:px-3 py-1 sm:py-3 text-xs sm:text-sm font-medium border transition-all duration-200
                ${
                  selectedSize === size
                    ? 'border-black text-black font-bold'
                    : 'border-gray-400 text-gray-600 hover:border-gray-600'
                }
              `}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{ borderRadius: '0px' }}
          className="flex items-center justify-center gap-2 min-w-[45px] h-9 sm:h-10 px-3 bg-black text-white rounded-none hover:bg-gray-800 transition-colors duration-200 overflow-hidden"
        >
          {/* Plus Icon with Animation */}
          <motion.div
            key={showAdded ? 'plus-anim' : 'plus-idle'}
            initial={{ rotate: 0, x: 0 }}
            animate={showAdded ? { rotate: 360, x: -10 } : { rotate: 0, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <Plus size={18} />
          </motion.div>

          {/* Added to Cart Text */}
          <AnimatePresence>
            {showAdded && (
              <motion.span
                key="added-text"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="whitespace-nowrap text-xs sm:text-sm font-medium"
              >
                Added to Cart
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
