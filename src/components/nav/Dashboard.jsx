import React from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Menu from './Menu';
import Cost from './Cost';

const Dashboard = () => {
    return (
        <div className='mainDashboard'> 
      
            <Cost />
            <ProductList />   
            <Menu />
            
             
        </div>
    );
};

export default Dashboard;