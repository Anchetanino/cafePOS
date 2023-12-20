import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.svg';
import LogOut from '../images/Exit_Icon.svg';
import MenuIcon from '../images/Menu_Icon.svg';
import DashboardIcon from '../images/Dashboard.svg';
import ProductListIcon from '../images/Product_List.svg';
import HistoryIcon from '../images/History.svg';
// import StocksIcon from '../images/Stocks.svg'; // Uncomment this line if you use StocksIcon
import ProfileImage from '../images/Profile.jpg';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = ({ userProfile }) => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
     };
  return (
    <div className='navBar'>
      <div className='iconOne' ref={menuRef}>
        <div onClick={() => setOpen(!open)}>
          <img src={MenuIcon} className='menuIcon' width='25px' height='25px' alt='Menu' />
        </div>

        <img src={Logo} className='logoIcon' width='45px' height='45px' alt='Logo' />

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
          <ul>
            <Link to='/dashboard' onClick={() => setOpen(false)}>
              <DropdownItem img={DashboardIcon} text={'Menu'} />
            </Link>
            <Link to='/productsList' onClick={() => setOpen(false)}>
              <DropdownItem img={ProductListIcon} text={'Products List'} />
            </Link>
            <Link to='/history' onClick={() => setOpen(false)}>
              <DropdownItem img={HistoryIcon} text={'Order History'} />
            </Link>
            {/* Uncomment the following line if you use StocksIcon */}
            {/* <Link to='/stocks' onClick={() => setOpen(false)}>
              <DropdownItem img={StocksIcon} text={'Stocks'} />
            </Link> */}
            <Link to='/login' onClick={() => {setOpen(false); handleLogout();}}>
              <DropdownItem img={LogOut} text={'Logout'} />
            </Link>
          </ul>
        </div>
      </div>
      <div className='iconTwo'>
      {userProfile && (
        <p>Hello, {userProfile.displayName}</p>
  // <img
  //   src={userProfile.photoURL || ProfileImage}
  //   className="profileIcon"
  //   alt="Profile"
  // />
)}
        <Link to="/login" onClick={() => handleLogout()}>
          <img
            src={LogOut}
            className="logoutIcon"
            width="25px"
            height="25px"
            alt="Log Out"
          />
        </Link>
      </div>
    </div>
  );
};


function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img src={props.img} alt='' />
      <a>{props.text}</a>
    </li>
  );
}

export default Navbar;
