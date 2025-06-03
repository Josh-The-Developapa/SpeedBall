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

import Product1 from "../../assets/full-fit.svg";
import Product2 from "../../assets/jacket.svg";
import Product3 from "../../assets/jeans.svg";

function CartPage() {
  // const ctx = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showCheckoutOverlay, setShowCheckoutOverlay] = useState(false);
  const [showAddressOverlay, setShowAddressOverlay] = useState(false);
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

  function handleFinalCheckout() {
    if (!address.fullName || !address.line || !address.phone) {
      alert("Please complete all address fields.");
      return;
    }

    sendOrderToServer({ cartItems, address }); // or Supabase insert
    setCartItems([]);
    setShowCheckoutOverlay(false);
  }

  // whree the magic happens
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError("Please add some items to cart first.");
      return;
    }

    setLoading(true);

    const checkoutData = {
      cartItems,
      address,
      totalShirts: computeCost(cartItems).totalQuantity,
      totalCost:
        computeCost(cartItems).totalCost * (1 - Number(discount) / 100),
      date: new Date(Date.now() + 3 * 3600 * 1000).toUTCString(), // EAT offset
      status: "pending",
    };

    fetch("https://conspiracy-67f09-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => res.json())
      .then(() => {
        setCheckoutComplete(true);
        setCartItems([]);
        localStorage.removeItem("CartItems");
        setShowAddressOverlay(false);
      })
      .catch((err) => {
        console.error("Checkout Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#232323] text-white">
      <Header />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        {/* Hero image */}
        <div className="w-full lg:w-[42vw] h-[50vh] lg:h-auto">
          <img
            src={hero}
            alt="Hero"
            className="w-full h-full object-cover object-[center_top]"
          />
        </div>

        {/* Right side */}
        <div className="lg:w-[58vw] flex flex-col min-h-[calc(100vh-80px)]">
          {/* Cart Header */}
          <div className="pt-6 px-6 mt-21">
            <div className="text-2xl font-semibold m-0 p-0">Your Cart</div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-6 overflow-y-auto">
            {cartItems.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full md:w-[48%] bg-[#2a2a2a] border border-gray-600 py-5 px-4 flex items-center justify-between text-white min-h-[6.5rem]"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-contain"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-sm tracking-wide">{item.title}</h3>
                        <p className="text-[0.975rem] font-medium">
                          UGX {item.price.toLocaleString("en-UG")}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity - 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-white rounded-full text-xs"
                          >
                            –
                          </button>
                          <span className="text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(index, item.quantity + 1)
                            }
                            className="w-6 h-6 flex items-center justify-center border border-white rounded-full text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Size badge remains inside normal flow */}
                    <div className="flex flex-col items-end mt-auto space-y-2">
                      <span className="text-xs border border-gray-500 px-2 py-[1px] rounded-full">
                        {item.size}
                      </span>
                    </div>

                    {/* Close button positioned absolutely top right */}
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="absolute top-2 right-2 w-6 h-6 text-[10px] text-red-500 border border-red-500 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white"
                    >
                      ×
                    </button>
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

            {/* Total Section */}
            <div className="mb-6 space-y-2">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total</span>
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
              <div className="flex gap-4">
                <button
                  className="flex-1 px-6 py-4 bg-[#3B4CCA] text-white rounded-lg font-semibold text-lg hover:bg-[#2A3BB7] transition-colors flex items-center justify-center"
                  onClick={() => setShowAddressOverlay(true)}
                >
                  {loading ? (
                    <ImSpinner9 className="w-6 h-6 animate-spin" />
                  ) : (
                    "CHECKOUT"
                  )}
                </button>
                <button className="text-white flex-1 px-6 py-4 border border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                  CONTINUE SHOPPING
                </button>
              </div>
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
