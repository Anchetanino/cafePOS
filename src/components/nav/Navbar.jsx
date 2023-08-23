import React, { useEffect, useRef, useState } from 'react';
import Logo from '../images/Logo.svg';
import LogOut from '../images/Exit_Icon.svg';
import MenuIcon from '../images/Menu_Icon.svg';
import DashboardIcon from '../images/Dashboard.svg';
import ProductListIcon from '../images/Product_List.svg';
import HistoryIcon from '../images/History.svg';
import StocksIcon from '../images/Stocks.svg';
import { Link } from 'react-router-dom';
import Profile from '../images/Profile.jpg';


const Navbar = () => {
    const [open, setOpen] = useState(false);

    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          console.log(menuRef.current);
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });

    return (
        <div className='navBar' >
            <div className='iconOne' ref={menuRef} >
                <div onClick={()=>{setOpen(!open)}}>
                    <img src={MenuIcon}  className='menuIcon' width="25px" height="25px" alt="Menu" />
                </div>
                
                <img src={Logo} className='logoIcon' width="45px" height="45px" alt="Logo" /> 

                 <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} > 
                    <ul>
                      <Link to='/dashboard'>
                        <DropdownItem img = {DashboardIcon} text = {"Menu"}/>
                      </Link>
                      <Link to='/productsList'>
                      <DropdownItem img = {ProductListIcon} text = {"Products List"}/>
                      </Link>
                      <Link to='/history'>
                      <DropdownItem img = {HistoryIcon} text = {"Order History"}/>
                      </Link>
                      <Link to='/stocks'>
                      <DropdownItem img = {StocksIcon} text = {"Stocks"}/>
                      </Link>
                      <Link to='/'>
                      <DropdownItem img = {LogOut} text = {"Logout"}/>
                      </Link>
                    
                    
                    
                    
                    </ul>
            </div>
            </div>
            <div className='iconTwo'>
                <img src={Profile} className='profileIcon' alt="Profile" />
                <Link to='/'>
                  <img src={LogOut} className='logoutIcon' width="25px" height="25px" alt="Log Out" />
                </Link>
                
            </div>

           
           
            
        </div>
    );
};

function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img}></img>
        <a> {props.text} </a>
      </li>
    );
  }

export default Navbar;