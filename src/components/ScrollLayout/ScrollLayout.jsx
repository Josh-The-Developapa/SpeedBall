// components/ScrollLayout.jsx
import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

const ScrollLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' }); // or 'smooth'
  }, [location.pathname]);

  return <Outlet />;
};

export default ScrollLayout;
