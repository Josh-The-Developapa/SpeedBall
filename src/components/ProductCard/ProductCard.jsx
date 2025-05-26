import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard(props) {
  const [selectedSize, setSelectedSize] = useState('');

  const sizes = ['M', 'L', 'XL', '2XL'];

  return (
    <div className="bg-zinc-900 text-white shadow-lg p-4 w-72 space-y-4 product-card">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-zinc-800 rounded-xl flex items-center justify-center image-holder">
        <img
          src={props.image}
          className="product-image"
          style={props.image_dimensions}
        />
      </div>

      {/* Product Name */}
      <h2 className="text-lg font-semibold">{props.product}</h2>

      {/* Price */}
      <p className="text-lg text-blue-400 font-bold">{props.price}</p>

      {/* Size Selection */}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-3 py-1 rounded-md border ${
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
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
        ADD TO CART
      </button>
    </div>
  );
}
