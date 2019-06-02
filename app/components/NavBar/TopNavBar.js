import React from 'react';
import '../../../assets/styles/NavBar.scss';
import logo from '../../../assets/favicon/happyfox-color.png';

const TopNavBar = () => (
  <div className="navContainer d-flex justify-content-center align-items-center container-fluid">
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  </div>
);

export default TopNavBar;
