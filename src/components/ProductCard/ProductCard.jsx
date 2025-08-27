import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
// import Context from '../../Context/Context';

export default function ProductCard(props) {
  // const ctx = useContext(Context);
  const navigate = useNavigate();
  const productFormattedName =
    props.product?.replace(/\s+/g, '-').toLowerCase() || 'sample-product';
  const [selectedSize, setSelectedSize] = useState('');
  const [showAdded, setShowAdded] = useState(false);
  const sizes = ['M', 'L', 'XL', '2XL'];

  const handleAddToCart = () => {
    // cart logic
    const sanitizedPrice = parseInt(
      (props.price || '25000')
        .toString()
        .replace(/UGX\s*/gi, '')
        .replace(/[^0-9]/g, ''),
      10
    );

    const product = {
      title: props.product || 'Sample Product',
      price: sanitizedPrice,
      image: (
        props.image ||
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop'
      ).split('?')[0],
      quantity: 1,
      size: selectedSize || sizes[0],
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

    // animation trigger
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  const handleProductClick = () => {
    if (navigate) {
      navigate(`/product/${productFormattedName}`);
    } else {
      console.log('Navigate to:', `/product/${productFormattedName}`);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Image Container */}
      <div className="relative w-full overflow-hidden">
        <img
          src={props.image}
          alt={props.product}
          onClick={handleProductClick}
          className="w-full h-[400px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
        />
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
        UGX {props.price || '25000'}
      </p>

      {/* Sizes and Cart Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Size Buttons */}
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
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
