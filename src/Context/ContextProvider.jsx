import Context from "./Context.jsx";
import { useState, useEffect } from "react";

function ContextProvider(props) {
  const [isDrop, setIsDrop] = useState(false);
  const [contactCard, setContactCard] = useState(false);
  const [modal, setModal] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cart items from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("CartItems");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Sync cart items to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("CartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const setIsDropVal = (val) => {
    setIsDrop(val);
  };

  const setModalVal = (val) => {
    setModal(val);
  };

  const triggerCartAnimation = () => {
    setAnimateCart(true);
    const timer = setTimeout(() => {
      setAnimateCart(false);
    }, 1000);
    return () => clearTimeout(timer);
  };

  const toggleContactCard = (val) => {
    setContactCard(val);
  };

  return (
    <Context.Provider
      value={{
        isDrop,
        modal,
        animateCart,
        contactCard,
        cartItems, // Provide cartItems to consumers
        setIsDropVal,
        setModalVal,
        setAnimateCart: triggerCartAnimation,
        setContactCard: toggleContactCard,
        setCartItems, // Provide setter for cartItems
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default ContextProvider;
