import { createContext } from "react";

const Context = createContext({
  isDrop: false,
  modal: false,
  animateCart: false,
  contactCard: false,
  cartItems: [], // Added cartItems to context
  setContactCard: () => {},
  setModalVal: () => {},
  setIsDropVal: () => {},
  setAnimateCart: () => {},
  setCartItems: () => {}, // Added setter for cart items
});

export default Context;
