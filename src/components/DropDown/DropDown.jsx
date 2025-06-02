// DropDown.jsx
import { useContext, useEffect, useRef, useState } from 'react';
import './DropDown.css';
import { NavLink } from 'react-router-dom';
import Context from '../../Context/Context';

function DropDown() {
  const context = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (context.isDrop) {
      setVisible(true);
      setAnimationClass('show');
    } else if (visible) {
      setAnimationClass('hide');
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300); // match hide animation
      return () => clearTimeout(timer);
    }
  }, [context.isDrop]);

  if (!visible) return null;

  return (
    <div
      className={`dropdown ${animationClass}`}
      onClick={() => {
        context.setIsDropVal(false);
      }}
    >
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'active' : 'navlink')}
        onClick={() => {
          context.setIsDropVal(false);
        }}
        style={{ marginTop: '40px' }}
      >
        Home
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? 'active' : 'navlink')}
        onClick={() => {
          context.setIsDropVal(false);
        }}
      >
        Shop
      </NavLink>
      <NavLink
        to="/events"
        className={({ isActive }) => (isActive ? 'active' : 'navlink')}
        onClick={() => {
          context.setIsDropVal(false);
        }}
      >
        Events
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? 'active' : 'navlink')}
        onClick={() => {
          context.setIsDropVal(false);
        }}
      >
        Cart
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? 'active' : 'navlink')}
        onClick={() => {
          context.setIsDropVal(false);
        }}
      >
        About
      </NavLink>
    </div>
  );
}

export default DropDown;
