import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ProductCard.css';

export default function ProductCard(props) {
  const navigate = useNavigate();
  const productFormattedName = props.product.replace(/\s+/g, '-').toLowerCase();
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['M', 'L', 'XL', '2XL'];

  return (
    <div className="bg-zinc-900 text-white  p-4 w-72 space-y-4 product-card">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-zinc-800 rounded-xl flex items-center justify-center image-holder">
        <img
          src={props.image}
          className="product-card-image"
          style={props.image_dimensions}
        />
      </div>

      {/* Product Name */}
      <h2
        className="text-lg font-semibold product-card-title"
        onClick={() => navigate(`/product/${productFormattedName}`)}
      >
        {props.product}
      </h2>

      {/* Price */}
      <p className="text-lg text-white-400 font-bold price">{props.price}</p>

      {/* Size Selection */}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-3 py-1 rounded-md border sizes ${
              selectedSize === size
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-zinc-600 text-gray-300'
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Add to Cart Button */}
      <button className="w-full text-white py-2 rounded-xl transition cart-button">
        ADD TO CART
      </button>
    </div>
  );
}
