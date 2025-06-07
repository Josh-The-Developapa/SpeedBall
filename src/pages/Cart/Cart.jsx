import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import hero from '../../assets/speedball-homepage-laptop.jpeg';
import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { supabase } from '../../lib/supabaseClient';
import CloseIcon from '../../assets/close-icon.svg';
import PlusIcon from '../../assets/plus-circle.svg';
import MinusIcon from '../../assets/minus-circle.svg';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddressOverlay, setShowAddressOverlay] = useState(false);
  const [error, setError] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(() => {
    return localStorage.getItem('PaymentModalState') === 'open';
  });

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [date, setDate] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    cityTown: '',
    street: '',
    country: 'Uganda',
    phoneNumber: '',
    date: date,
  });

  function formatPhoneNumber(raw) {
    if (!raw) return '';

    const parsed = parsePhoneNumberFromString(raw, 'UG'); // fallback region if country code is missing
    if (!parsed.isValid()) {
      setError('Please enter a valid phone number.');
      return;
    }
    if (!parsed || !parsed.isValid()) return raw;

    return parsed.formatInternational(); // e.g. +256 712 345 678
  }

  useEffect(() => {
    const storedCart = localStorage.getItem('CartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (localStorage.getItem('PaymentModalState') === 'open') {
      setShowPaymentModal(true);
    }
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return; // prevent non positive quantities

    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
  };

  const computeTotals = (array) => {
    let totalQuantity = 0;
    let totalCost = 0;
    array.forEach((item) => {
      totalQuantity += Number(item.quantity);
      totalCost += item.price * item.quantity;
    });
    return { totalQuantity, totalCost };
  };

  const handleClosePaymentModal = () => {
    if (
      !window.confirm(
        'Are you sure you want to close this screen? Payment may be missed.'
      )
    )
      return;
    setShowPaymentModal(false);
    localStorage.removeItem('PaymentModalState');
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    setError('');
  };

  // where the magic happens
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Please add some items to cart first.');
      return;
    }

    // Ensure all fields are filled
    const { fullName, cityTown, street, phoneNumber } = address;
    if (!fullName || !cityTown || !street || !phoneNumber) {
      setError('Please fill in all delivery information fields.');
      return;
    }

    // Optional: Validate phone number format
    const parsedPhone = parsePhoneNumberFromString(phoneNumber, 'UG');
    if (!parsedPhone || !parsedPhone.isValid()) {
      setError('Please enter a valid phone number.');
      return;
    }

    const { totalQuantity, totalCost } = computeTotals(cartItems);
    const delivery_address = `${fullName} \n\n ${street}, ${cityTown}, ${address.country}`;
    const phone_number = parsedPhone.formatInternational();

    setLoading(true);

    const { error } = await supabase.from('orders').insert([
      {
        items: cartItems,
        total_quantity: totalQuantity,
        total_cost: totalCost,
        delivery_address,
        phone_number,
      },
    ]);

    if (error) {
      console.error('Supabase Insert Error:', error.message);
      setError('Something went wrong. Please try again.');
    } else {
      localStorage.setItem('PaymentModalState', 'open');
      setShowPaymentModal(true);
      setCheckoutComplete(true);
      setCartItems([]);
      localStorage.removeItem('CartItems');
      setShowAddressOverlay(false);
    }

    setLoading(false);
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
          <div className="flex-1 xl:p-6 overflow-y-auto p-3">
            {cartItems.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full md:w-[350px] bg-[#2a2a2a] border border-gray-600 py-5 px-4 flex items-center justify-between text-white min-h-[9rem]"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="flex flex-col justify-between">
                        <h3
                          className="text-sm tracking-wide"
                          style={{ marginBottom: '10px', marginRight: '5px' }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-[0.975rem] font-medium"
                          style={{ marginBottom: '10px' }}
                        >
                          UGX {item.price.toLocaleString('en-UG')}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <img
                            src={MinusIcon}
                            alt="Minus-Icon"
                            className="w-6 h-6 flex items-center justify-center text-xs"
                            onClick={() =>
                              handleQuantityChange(index, item.quantity - 1)
                            }
                            style={{ cursor: 'pointer' }}
                          />
                          <span className="text-sm w-4 text-center">
                            {item.quantity}
                          </span>
                          <img
                            src={PlusIcon}
                            alt="Plus-Icon"
                            className="w-6 h-6 flex items-center justify-center rounded-full text-xs"
                            onClick={() =>
                              handleQuantityChange(index, item.quantity + 1)
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Size badge remains inside normal flow */}
                    <div className="flex flex-col items-end mt-auto space-y-0">
                      <span className="text-[16px] border border-gray-500 px-2 py-[1px]">
                        {item.size}
                      </span>
                    </div>
                    {/* Close button positioned absolutely top right */}

                    <img
                      src={CloseIcon}
                      alt="Close-Icon"
                      className="absolute top-2 right-2 w-6 h-6 text-[10px] rounded-full flex items-center justify-center hover:text-white"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteItem(index)}
                    />
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
            {showAddressOverlay && (
              <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
                <div className="bg-white text-black rounded-lg p-6 w-[90%] max-w-md relative">
                  <img
                    src={CloseIcon}
                    alt="Close-Icon"
                    className="absolute top-2 right-2 h-8 w-8 m-[10px]"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowAddressOverlay(false)}
                  />

                  <h3 className="text-lg font-semibold mb-4">
                    Add Delivery Address
                  </h3>
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
                      inputMode="tel"
                      pattern="[\d\s()+-]*"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={address.phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value;
                        // Allow digits, +, -, space, (, )
                        if (/^[\d\s()+-]*$/.test(val)) {
                          setAddress({ ...address, phoneNumber: val });
                        }
                      }}
                      onPaste={(e) => {
                        const paste = e.clipboardData.getData('text');
                        if (!/^[\d\s()+-]*$/.test(paste)) e.preventDefault();
                      }}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    />
                    <button
                      onClick={handleCheckout}
                      disabled={
                        !address.fullName ||
                        !address.cityTown ||
                        !address.street ||
                        !address.phoneNumber ||
                        cartItems.length === 0
                      }
                      className={`w-full mt-4 bg-[#3B4CCA] text-white py-3 rounded-lg font-semibold hover:bg-[#2A3BB7] ${
                        !address.fullName ||
                        !address.cityTown ||
                        !address.street ||
                        !address.phoneNumber ||
                        cartItems.length === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-900'
                      }`}
                    >
                      CONFIRM & ORDER
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Total Section */}
            <div className="flex flex-col items-start text-lg space-y-1 pb-4">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-medium">
                UGX {computeTotals(cartItems).totalCost.toLocaleString('en-UG')}
              </span>
            </div>

            {/* Checkout Button */}
            <div className="flex gap-4">
              {!checkoutComplete ? (
                <button
                  className={`flex-1 px-6 py-4 rounded-lg font-semibold text-lg flex items-center justify-center transition-colors ${
                    computeTotals(cartItems).totalCost > 0
                      ? 'bg-blue-700 text-white hover:bg-blue-800'
                      : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (computeTotals(cartItems).totalCost > 0) {
                      setShowAddressOverlay(true);
                    }
                  }}
                  disabled={computeTotals(cartItems).totalCost <= 0}
                >
                  {loading ? (
                    <ImSpinner9 className="w-6 h-6 animate-spin" />
                  ) : (
                    'CHECKOUT'
                  )}
                </button>
              ) : (
                <div className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 mr-2 animate-pulse" />
                  Order Sent
                </div>
              )}

              <Link to="/shop" className="flex-1">
                <button className="w-full px-6 py-4 bg-white text-white border border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors justify-center">
                  CONTINUE SHOPPING
                </button>
              </Link>
            </div>

            {showPaymentModal && (
              <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
                <div className="bg-white text-black p-6 rounded-lg w-[90%] max-w-md relative">
                  <button
                    onClick={handleClosePaymentModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
                  >
                    ×
                  </button>

                  <h2 className="text-xl font-semibold mb-4">
                    Order Confirmed
                  </h2>

                  <p className="mb-3 text-sm text-gray-800">
                    A courier will call your number shortly to confirm your
                    delivery address. <br />
                    <strong>Please do not make any payment yet.</strong>
                  </p>

                  <p className="mb-2 text-sm text-gray-800">
                    Once the courier arrives and confirms the delivery, pay{' '}
                    <strong>only</strong> to the following numbers:
                  </p>

                  <ul className="mb-4 text-blue-700 font-bold text-lg space-y-1">
                    <li>• +256 770 000000</li>
                    <li>• +256 701 111111</li>
                  </ul>

                  <p className="mb-2 text-sm text-gray-800">
                    Your contact number:
                  </p>

                  <div className="font-medium text-base text-gray-900 mb-4">
                    {formatPhoneNumber(address.phoneNumber)}
                  </div>

                  <p className="text-xs text-gray-600">
                    Keep this screen open until the call is complete.
                  </p>
                </div>
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
