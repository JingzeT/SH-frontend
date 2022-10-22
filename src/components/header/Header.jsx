import React from 'react';
import './header.styles.scss';

const Header = () => {

  return (
    <nav className='nav-menu'>
        <div className='logo'>
            <p>ShopHopper</p>
        </div>
        <ul>
            <li>
                <p>
                    Home
                </p>
            </li>
            <li>
                <p>
                    Shop
                </p>
            </li>
            
            <li>
                <p>
                    Sign In
                </p>
            </li>
        
        
            <li>
                <p>
                    Sign Up
                </p>
            </li>
            
        </ul>
    </nav>
  )
}

export default Header;