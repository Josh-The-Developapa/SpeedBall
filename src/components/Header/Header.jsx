import React, { useEffect, useState, useContext } from 'react';
import './Header.css';
import { FiMenu } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';
import Context from '../../Context/Context';
import DropDown from '../DropDown/DropDown';

function Header() {
  const context = useContext(Context);
  const location = useLocation();
  const [isAbout, setIsAbout] = useState(location.pathname == '/about');

  // Initialize colors based on the current path immediately
  const initialIconColor = location.pathname === '/' ? '#000000' : '#ffffff';
  const [iconColors, setIconColors] = useState(initialIconColor);

  // Logo is always displayed on all pages by default
  const [logoDisplay, setLogoDisplay] = useState('none');

  // Menu color state (though it seems tied to iconColors in your current setup)
  const [menuColor, setMenuColor] = useState('#ffffff'); // Keep this if menu color can be different

  const SB_Header_SVG = () => {
    return (
      <svg
        width="90"
        height="70"
        viewBox="0 0 64 25"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_286_414)">
          <path
            d="M34.6453 12.5693L34.7432 12.4899L51.4523 9.46158C52.3596 9.51902 53.0283 9.47847 53.8126 9.00205L61.8043 7.56689C61.7934 8.95391 61.1263 10.4634 60.1621 11.4441C60.0541 11.5539 59.4348 11.9898 59.459 12.0945C61.3255 12.8936 62.7484 14.3313 63.1971 16.3738C64.1521 20.7258 61.5448 24.1291 57.2033 24.4408L34.6461 24.4383V12.5693H34.6453ZM42.9751 18.7551H54.5015C54.5358 18.7551 54.9467 18.4856 55.002 18.4315C55.6055 17.8453 55.6841 16.8367 55.2004 16.155C55.0865 15.9954 54.6195 15.5578 54.4429 15.5578H42.9751V18.7542V18.7551Z"
            fill={iconColors}
          />
          <path
            d="M20.4215 8.4552C19.993 7.84194 19.5862 7.32413 18.9266 6.94486C16.9622 5.81379 11.7317 5.81886 9.774 6.94486C9.0885 7.33934 8.27577 8.36904 9.13453 9.0127C9.73466 9.46293 11.3292 9.62427 12.0925 9.69776C16.4642 10.1184 23.418 9.79237 27.0388 12.4921C27.2171 12.6247 27.5854 12.8958 27.6959 13.0724C27.7218 13.1138 27.7628 13.1737 27.6942 13.1915C27.5251 13.1898 27.3711 13.2591 27.2096 13.2945C23.3862 14.1291 19.4598 14.6528 15.6104 15.3277C11.4472 14.9316 3.28975 15.1917 0.740238 11.1515C-0.431565 9.29484 -0.107645 6.42536 0.98799 4.5915C3.73587 -0.00540608 11.931 -0.136336 16.609 0.0486554C21.6661 0.248007 27.3318 0.958407 28.8217 6.72608C28.933 7.15603 29.1104 7.82927 29.128 8.25753C29.1305 8.32596 29.1062 8.4552 29.0435 8.4552H20.4207H20.4215Z"
            fill={iconColors}
          />
          <path
            d="M39.7483 9.40161C39.8061 9.38219 39.8755 9.46074 39.8948 9.46074H47.8429C47.853 9.54944 47.6856 9.54944 47.6203 9.56126C42.3313 10.5648 37.0155 11.4289 31.7348 12.4738L31.3599 12.391V0.788118L31.5624 0.696045H52.6256C53.9146 0.863297 55.1952 1.22652 56.2506 2.01126C57.974 3.29268 58.796 5.36137 58.5507 7.50862L50.4527 9.04346L50.3941 8.92773C50.8846 8.27477 50.8905 7.46132 50.364 6.82694C50.2711 6.71459 49.8635 6.38178 49.7496 6.38178H39.8362L39.7483 6.47047V9.40077V9.40161Z"
            fill={iconColors}
          />
          <path
            d="M3.5564 18.2237L12.1122 16.6931C12.6111 17.7101 13.7243 18.304 14.7814 18.5869C16.6329 19.0828 21.6649 19.1047 23.1196 17.6898C23.4988 17.3207 23.8445 16.5655 23.3783 16.1271C22.6978 15.4868 20.5718 15.4936 19.6578 15.3821C19.5507 15.3686 19.5632 15.4007 19.5708 15.2638L30.9833 13.1884C31.0988 13.1757 31.1448 13.2391 31.2176 13.3075C32.4104 14.4259 32.5167 16.7463 32.2346 18.2465C30.8962 25.3547 19.6804 25.2483 14.2617 24.8547C11.8871 24.6823 9.57946 24.4087 7.4359 23.2784C5.47146 22.2428 4.04688 20.4132 3.55723 18.2254L3.5564 18.2237Z"
            fill={iconColors}
          />
          <path
            d="M8.65941 16.5648C8.57739 16.7177 8.30452 16.7498 8.14466 16.7853C5.83704 17.3006 3.03643 17.8141 0.696176 18.1478C0.55807 18.1672 0.414106 18.1774 0.276838 18.1562C0.245869 17.8885 0.141243 17.6173 0.101904 17.3563C0.0834903 17.2372 -0.024483 16.564 0.124503 16.564H8.65941V16.5648Z"
            fill={iconColors}
          />
        </g>
        <defs>
          <clipPath id="clip0_286_414">
            <rect width="64" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  useEffect(() => {
    const handleScrollResize = () => {
      const isHome = location.pathname === '/';
      const isAbout = location.pathname === '/about';
      const isEvents = location.pathname === '/events';
      const isShop = location.pathname === '/shop';
      const isCart = location.pathname === '/cart';
      const isAdmin = location.pathname === '/admin';
      const isProduct = location.pathname.includes('/product');
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const scrolledPast90vh = scrollY > screenHeight * 0.9;
      const screenWidth = window.innerWidth;

      if (isHome) {
        if (scrolledPast90vh) {
          // Regardless of width, always white
          setLogoDisplay('block');
          setIconColors('#ffffff');
        } else {
          if (screenWidth < 390) {
            // Less than 90vh AND small screen
            setLogoDisplay('block');
            setIconColors('#000000');
          } else {
            setLogoDisplay('none');
            setIconColors('#000000');
          }
        }
      } else if (isAbout || isEvents || isShop || isAdmin) {
        setLogoDisplay('block');
        setIconColors('#ffffff');
      } else if (isProduct || isCart) {
        setLogoDisplay('block');
        setIconColors('#000000');
      }
    };

    // Attach listeners
    window.addEventListener('scroll', handleScrollResize);
    window.addEventListener('resize', handleScrollResize);

    // Initial check on mount
    handleScrollResize();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScrollResize);
      window.removeEventListener('resize', handleScrollResize);
    };
  }, [location, window.scrollY, window.innerWidth]);

  return (
    <div className="Header" style={{ backgroundColor: isAbout ? 'black' : '' }}>
      <div
        className="backdrop"
        style={{ display: context.isDrop ? 'block' : 'none' }}
        onClick={() => {
          context.setIsDropVal(false);
        }}
      ></div>
      <div
        style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 0,
        }}
      >
        {/* Logo is always displayed, its color is managed by iconColors */}
        <div
          style={{
            display: logoDisplay === 'none' ? 'none' : 'flex',
            height: '100px',
            width: '200px',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: '20px',
          }}
          className="sb-logo-div"
        >
          <Link to="/" onClick={() => window.scrollY === 0}>
            <SB_Header_SVG />
          </Link>
        </div>
      </div>
      <div className="Header-right">
        <DropDown />
        <FiMenu
          className="Menu-icon"
          style={{
            color:
              context.isDrop || isAbout ? '#ffffff' : iconColors ?? '#000000',
            transition: 'transform 0.3s ease',
            transform: context.isDrop ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          onClick={() => {
            context.setIsDropVal(!context.isDrop);
          }}
        />
      </div>
    </div>
  );
}

export default Header;
