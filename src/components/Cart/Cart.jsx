import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context.jsx';
import { IoMdTrash } from 'react-icons/io';
import { FiCheckCircle } from 'react-icons/fi';
import { ImSpinner9 } from 'react-icons/im';
import { IoIosAddCircle } from 'react-icons/io';
import { IoMdArrowDropupCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import './Cart.css';

function Cart() {
  const ctx = useContext(Context);
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [error, setError] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [addressExpanded, setAddressExpanded] = useState(false); // State to track address section expansion
  const [date, setDate] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    cityTown: '', // Removed stateProvince
    street: '',
    country: 'Uganda',
    phoneNumber: '',
    date: date,
  });

  useEffect(() => {
    if (!localStorage.getItem('CartItems')) return;
    setCartItems(JSON.parse(localStorage.getItem('CartItems')));
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
  };

  const handleSizeChange = (index, newSize) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].size = newSize;
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
  };

  const handleCouponVerification = async () => {
    const couponData = await fetchCouponData();
    console.log(couponData);

    if (coupon.trim() == '') {
      setDiscount(0);
      setError('');
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
    setError('No discount applied');
    return;
  };

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    localStorage.setItem('CartItems', JSON.stringify(updatedCartItems));
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
    setError('');
  };

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleCheckout = async () => {
    if (cartItems.length == 0) {
      setError('Please add some items to cart first');
      return;
    }

    setLoading(true);

    if (
      address.cityTown.trim() == '' ||
      address.street.trim() == '' ||
      address.phoneNumber.trim() == ''
    ) {
      setError('Please fill in all the above fields.');
      setLoading(false); // Reset loading state
    } else {
      setError('');
      // Get the current time in milliseconds
      const currentTimeMillis = Date.now();

      // Define the time zone offset for EAT in milliseconds
      const eatOffsetMillis = 3 * 60 * 60 * 1000; // 3 hours * 60 minutes * 60 seconds * 1000 milliseconds

      // Calculate the time in EAT by adding the offset to the current time
      const eatTimeMillis = currentTimeMillis + eatOffsetMillis;

      // Create a new Date object using the EAT time
      const eatTime = new Date(eatTimeMillis);

      // Format the EAT time as a string
      const eatTimeString = eatTime.toUTCString();

      const checkoutData = {
        cartItems: cartItems,
        address: address,
        totalShirts: computeCost(cartItems).totalQuantity,
        totalCost:
          computeCost(cartItems).totalCost * (1 - Number(discount) / 100),
        coupon: coupon,
        date: eatTimeString,
        status: 'pending',
      };

      // Send data to Firebase
      fetch(
        'https://conspiracy-67f09-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkoutData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log('Checkout complete:', data);
          setCheckoutComplete(true);
          setLoading(false); // Reset loading state
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false); // Reset loading state
        });
    }
  };

  async function fetchCouponData() {
    // Firebase URL
    const firebaseUrl =
      'https://conspiracy-67f09-default-rtdb.firebaseio.com/coupons.json';

    // Request options
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      // Make the fetch request
      const response = await fetch(firebaseUrl, requestOptions);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData;
      // Handle success
    } catch (error) {
      return 'Error sending data to Firebase:';
      // Handle error
    }
  }

  return (
    <div className="modal-container">
      <div className="modalBG" onClick={() => ctx.setModalVal(false)} />
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Your Cart</h3>
          <IoClose
            className="close-btn"
            onClick={() => ctx.setModalVal(false)}
          />
        </div>
        <div className="modal-content">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="item-container" key={index}>
                <img
                  src={`../../assets/${item.image}`}
                  alt={item.title}
                  className="item-image"
                />
                <div className="item-details">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-price">
                    {item.price.toLocaleString('en-US')} UGX
                  </p>
                  <input
                    style={{ width: '70px' }}
                    placeholder="quantity"
                    type="number"
                    min="1"
                    step="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                  <br />
                  <select
                    value={item.size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
                <IoMdTrash
                  className="trash-can"
                  onClick={() => handleDeleteItem(index)}
                />
              </div>
            ))
          ) : (
            <h2 style={{ color: 'black' }}>No Items in Cart</h2>
          )}
        </div>
        <div className="address-section">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h3>Add Delivery Address {/* <span> */}</h3>
            {addressExpanded ? (
              <IoMdArrowDropupCircle
                title="collapse"
                style={{
                  color: '#000000',
                  height: '35px',
                  width: '35px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => setAddressExpanded(!addressExpanded)}
              />
            ) : (
              <IoIosAddCircle
                title="expand"
                style={{
                  color: '#000000',
                  height: '35px',
                  width: '35px',
                  marginLeft: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => setAddressExpanded(!addressExpanded)}
              />
            )}
          </div>
          {/* </span> */}
          {addressExpanded && ( // Render input fields if address section is expanded
            <>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="cityTown"
                placeholder="City or Town"
                value={address.cityTown}
                onChange={handleAddressChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={handleAddressChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={address.phoneNumber}
                onChange={handleAddressChange}
              />
            </>
          )}
          {/* <label style={{ color: 'black' }}>Enter Coupon:</label> */}
          <div>
            <input
              type="text"
              name="coupon"
              placeholder="Enter Coupon - Optional"
              value={coupon}
              onChange={handleCouponChange}
              style={{ marginBottom: '-5px', width: '60%' }}
            />{' '}
            <button onClick={handleCouponVerification} className="verify-btn">
              Verify
            </button>
          </div>
          {error && error.trim().includes('Valid') ? (
            <p
              style={{
                color: 'green',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              {error}
            </p>
          ) : (
            <p
              style={{
                color: 'red',
                marginTop: '5px',
                marginBottom: '5px',
              }}
            >
              {error}
            </p>
          )}
          <div className="total-info">
            <h3>
              Total Shirts:{' '}
              {+computeCost(cartItems).totalQuantity.toLocaleString('en-US')}
            </h3>
            <h3>
              Total Cost:{' '}
              {(
                computeCost(cartItems).totalCost *
                (1 - Number(discount) / 100)
              ).toLocaleString('en-US')}{' '}
              UGX
            </h3>
            {!checkoutComplete ? (
              <button className="checkout-btn" onClick={handleCheckout}>
                {loading ? (
                  <ImSpinner9
                    className="loading-icon"
                    style={{ color: '#ffffff', height: '30px', width: '30px' }}
                  />
                ) : (
                  'Confirm Order'
                )}
              </button>
            ) : (
              <div className="checkout-complete">
                <FiCheckCircle className="checkout-icon" />
                <span style={{ marginLeft: '10px' }}>Order sent</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
