import React from 'react';
import NavBar from '../nav/Navbar';
import Dashboard from '../nav/Dashboard';
import OrderHistory from '../nav/OrderHistory';
import Stocks from '../nav/Stocks';
import ProductAvailable from '../nav/ProductAvailable';
import Login from './Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home'>
            <BrowserRouter>
       <NavBar/>
        <Routes>
        {/* <Route path='/' element={<Login/>}/> */}
        <Route path="/" element={<Dashboard /> }/>
        <Route path="productsList" element={<ProductAvailable/> }/>
        <Route path="stocks" element={<Stocks/> }/>
        <Route path="history" element={<OrderHistory/> }/>
      </Routes>


      </BrowserRouter>
        </div>
    );
};

export default Home;