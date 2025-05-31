import { useState, useContext } from "react";
import "./ProductCard.css";
import Context from "../../Context/Context";

export default function ProductCard(props) {
  const ctx = useContext(Context);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeJustAdded, setSizeJustAdded] = useState(false);
  const [buttonText, setButtonText] = useState("ADD TO CART");
  const sizes = ["M", "L", "XL", "2XL"];

  const handleAddToCart = () => {
    // Debug log before processing
    console.log("Add to cart clicked for:", {
      product: props.product,
      price: props.price,
      size: selectedSize || "Not selected",
    });

    const product = {
      title: props.product,
      price: props.price,
      image: props.image,
      quantity: 1,
      size: selectedSize || sizes[0], // Default to first size if none selected
    };

    // Trigger cart animation
    if (ctx.setAnimateCart) {
      ctx.setAnimateCart(true);
      setTimeout(() => {
        ctx.setAnimateCart(false);
      }, 1000);
    }

    // Get existing cart items
    const existingCartItems =
      JSON.parse(localStorage.getItem("CartItems")) || [];
    console.log("Existing cart items:", existingCartItems);

    // Check if product exists
    const existingProductIndex = existingCartItems.findIndex(
      (item) => item.title === product.title && item.size === product.size
    );

    if (existingProductIndex !== -1) {
      existingCartItems[existingProductIndex].quantity += 1;
      console.log("Increased quantity for existing product");
    } else {
      existingCartItems.push(product);
      console.log("Added new product to cart");
    }

    // Update storage
    localStorage.setItem("CartItems", JSON.stringify(existingCartItems));
    console.log("Updated cart:", existingCartItems);

    // Reset size selection
    setSizeJustAdded(true);
    setTimeout(() => {
      setSelectedSize("");
      setSizeJustAdded(false);
    }, 100);

    // Update button feedback
    setButtonText("ADDED!");
    setTimeout(() => {
      setButtonText("ADD TO CART");
    }, 2000);

    // Debug log after processing
    console.log("Order processed:", product);
  };

  return (
    <div className="bg-zinc-900 text-white shadow-lg p-4 w-72 space-y-4 product-card">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-zinc-800 rounded-xl flex items-center justify-center image-holder">
        <img
          src={props.image}
          className="product-image"
          style={props.image_dimensions}
          alt={props.product}
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
            onClick={() => {
              setSelectedSize(size);
              console.log("Size selected:", size); // Debug log for size selection
            }}
            className={`px-3 py-1 rounded-md border ${
              selectedSize === size && !sizeJustAdded
                ? "border-white shadow-[0_0_0_2px_white]" // Permanent hover style
                : "border-zinc-600 text-gray-300 hover:border-white hover:shadow-[0_0_0_2px_white]"
            } transition-all duration-250`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Add to Cart Button */}
      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        onClick={handleAddToCart}
      >
        {buttonText}
      </button>
    </div>
  );
}
