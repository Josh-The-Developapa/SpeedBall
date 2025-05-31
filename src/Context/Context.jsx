import { createContext } from "react";

export const Context = createContext({
  // Changed to named export
  isDrop: false,
  modal: false,
  animateCart: false,
  contactCard: false,
  cartItems: [],
  setContactCard: () => {},
  setModalVal: () => {},
  setIsDropVal: () => {},
  setAnimateCart: () => {},
  setCartItems: () => {},
});

// Keep default export if needed elsewhere
export default Context;
