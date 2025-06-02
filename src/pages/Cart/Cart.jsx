import React, { useContext, useEffect, useState } from "react";
import Context from "../../Context/Context.jsx";
import { IoMdTrash, IoMdArrowBack } from "react-icons/io";
import { FiCheckCircle } from "react-icons/fi";
import { ImSpinner9 } from "react-icons/im";
import { IoIosAddCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import hero from "../../assets/speedball-homepage-laptop.jpeg";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function CartPage() {
  const ctx = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [addressExpanded, setAddressExpanded] = useState(false);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    cityTown: "",
    street: "",
    country: "Uganda",
    phoneNumber: "",
    date: date,
  });

  useEffect(() => {
    if (!localStorage.getItem("CartItems")) return;
    setCartItems(JSON.parse(localStorage.getItem("CartItems")));
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
  };

  const handleSizeChange = (index, newSize) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].size = newSize;
    setCartItems(updatedCartItems);
    localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
  };

  const handleCouponVerification = async () => {
    const couponData = await fetchCouponData();
    console.log(couponData);

    if (coupon.trim() == "") {
      setDiscount(0);
      setError("");
      return;
    }

    for (let i in couponData) {
      if (coupon.trim() == couponData[i].couponName) {
        setError(`Valid Coupon. ${couponData[i].discount}% discount applied`);
        setDiscount(couponData[i].discount);
        return;
      }
    }
    setDiscount(0);
    setError("No discount applied");
    return;
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem("CartItems", JSON.stringify(updatedCartItems));
  };

  const computeCost = (array) => {
    let totalQuantity = 0;
    let totalCost = 0;
    array.forEach((item) => {
      totalQuantity += Number(item.quantity);
      totalCost += item.price * item.quantity;
    });
    return { totalQuantity, totalCost };
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    setError("");
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleCheckout = async () => {
    if (cartItems.length == 0) {
      setError("Please add some items to cart first");
      return;
    }

    setLoading(true);

    if (
      address.cityTown.trim() == "" ||
      address.street.trim() == "" ||
      address.phoneNumber.trim() == ""
    ) {
      setError("Please fill in all the above fields.");
      setLoading(false);
    } else {
      setError("");
      const currentTimeMillis = Date.now();
      const eatOffsetMillis = 3 * 60 * 60 * 1000;
      const eatTimeMillis = currentTimeMillis + eatOffsetMillis;
      const eatTime = new Date(eatTimeMillis);
      const eatTimeString = eatTime.toUTCString();

      const checkoutData = {
        cartItems: cartItems,
        address: address,
        totalShirts: computeCost(cartItems).totalQuantity,
        totalCost:
          computeCost(cartItems).totalCost * (1 - Number(discount) / 100),
        coupon: coupon,
        date: eatTimeString,
        status: "pending",
      };

      fetch(
        "https://conspiracy-67f09-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(checkoutData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setCheckoutComplete(true);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  };

  async function fetchCouponData() {
    const firebaseUrl =
      "https://conspiracy-67f09-default-rtdb.firebaseio.com/coupons.json";

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(firebaseUrl, requestOptions);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return "Error sending data to Firebase:";
    }
  }

  return (
    <div className="min-h-screen bg-[#232323] text-white font-['Alata']">
      <Header />
      {/* TODO add some padding, so header and button do not overlap */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center text-white hover:text-gray-300 transition-colors"
        >
          <IoMdArrowBack className="w-6 h-6 mr-2" />
          Back to Home
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Hero Image Section */}
        {/* TODO make sure not the whole image is shown; dynamically crop according to available width of viewport (add variable to control extremity of the cropping) */}
        <div className="w-full h-64 lg:h-auto lg:w-[42vw]">
          <img
            src={hero}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Cart Section */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Cart Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6 overflow-y-auto max-h-96">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={`../../assets/${item.image}`}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 mb-2">
                          UGX {item.price.toLocaleString("en-US")}
                        </p>
                        <div className="flex items-center space-x-3">
                          <input
                            className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                            placeholder="Qty"
                            type="number"
                            min="1"
                            step="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(index, e.target.value)
                            }
                          />
                          <select
                            value={item.size}
                            onChange={(e) =>
                              handleSizeChange(index, e.target.value)
                            }
                            className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-sm"
                          >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                          </select>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <IoMdTrash className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl text-gray-400">No Items in Cart</h2>
              </div>
            )}
          </div>

          {/* Checkout Section */}
          <div className="bg-white text-black p-6">
            {/* Address Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <h3 className="text-lg font-semibold">Add Delivery Address</h3>
                <button
                  onClick={() => setAddressExpanded(!addressExpanded)}
                  className="ml-3 text-black hover:text-gray-600 transition-colors"
                >
                  {addressExpanded ? (
                    <IoMdArrowDropupCircle className="w-8 h-8" />
                  ) : (
                    <IoIosAddCircle className="w-8 h-8" />
                  )}
                </button>
              </div>

              {addressExpanded && (
                <div className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={address.fullName}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    name="cityTown"
                    placeholder="City or Town"
                    value={address.cityTown}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={address.phoneNumber}
                    onChange={handleAddressChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>
              )}
            </div>

            {/* Coupon Section */}
            <div className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  name="coupon"
                  placeholder="Enter Coupon - Optional"
                  value={coupon}
                  onChange={handleCouponChange}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                />
                <button
                  onClick={handleCouponVerification}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Verify
                </button>
              </div>

              {error && (
                <p
                  className={`mt-2 text-sm ${
                    error.includes("Valid") ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {error}
                </p>
              )}
            </div>

            {/* Total Section */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Shirts:</span>
                <span className="font-bold">
                  {computeCost(cartItems).totalQuantity.toLocaleString("en-US")}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Cost:</span>
                <span className="font-bold">
                  UGX{" "}
                  {(
                    computeCost(cartItems).totalCost *
                    (1 - Number(discount) / 100)
                  ).toLocaleString("en-US")}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            {!checkoutComplete ? (
              <button
                className="w-full bg-[#3B4CCA] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#2A3BB7] transition-colors flex items-center justify-center"
                onClick={handleCheckout}
              >
                {loading ? (
                  <ImSpinner9 className="w-6 h-6 animate-spin" />
                ) : (
                  "CHECKOUT"
                )}
              </button>
            ) : (
              <div className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center">
                <FiCheckCircle className="w-5 h-5 mr-2 animate-pulse" />
                Order Sent
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;
