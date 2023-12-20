import React, { useState } from 'react';
import Navbar from './Navbar';
import ProductList from './ProductList';
import Menu from './Menu';
import Cost from './Cost';

const Dashboard = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [overallTotalPrice, setOverallTotalPrice] = useState(0);

    // Define a function to update the selectedMenuItem in this component
    const handleMenuItemChange = (filteredProducts) => {
        setSelectedProduct(filteredProducts);
    };

    

   

    return (
        <div className='mainDashboard'> 
      
            <Cost selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} setOverallTotalPrice={setOverallTotalPrice}/>
            <ProductList category={selectedProduct} onProductSelect={setSelectedProducts} />
            <Menu onMenuItemChange={handleMenuItemChange} />   
        </div>
    );
};

export default Dashboard;