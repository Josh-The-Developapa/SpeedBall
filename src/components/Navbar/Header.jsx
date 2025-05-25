import React from 'react';
import './Header.css';
import SB_Logo from '../../assets/SPEEBALL/logo/sbbbb-copy.png';
import { FiMenu } from 'react-icons/fi';

function Header() {
  return (
    <div className="Header">
      <div
        style={{
          width: '50%',
          height: '100%',
          paddingLeft: '15px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          // backgroundColor: 'blue',
        }}
      >
        <img src={SB_Logo} alt="SB-Logo" className="SB-Logo-Header" />
      </div>

      <div
        style={{
          width: '50%',
          // backgroundColor: 'red',
          height: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '15px',
        }}
      >
        <FiMenu className="Menu-icon" />
      </div>
    </div>
  );
}

export default Header;
