import React, { useState, useEffect } from 'react';
import comboMeal from '../images/comboMeal.jpg';
import milkteaSeries from '../images/milkteaSeries.jpg';
import pastaSnacks from '../images/pastaSnacks.jpg';
import riceBowls from '../images/riceBowls.jpg';

const Menu = ({ onMenuItemChange }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
  const menu = [
    {
      id: 1,
      name: "Rice Bowl",
      caregory: "riceBowl",
      image: riceBowls
    },
    {
      id: 2,
      name: "Bird's Combos",
      category: "birdsCombos",
      image: comboMeal
    },
    {
      id: 3,
      name: "Pizza Treats",
      category: "pizzaTreats",
      image: pastaSnacks
    },
    {
      id: 4,
      name: "Pasta and Snacks",
      category: "pastaSnacks",
      image: pastaSnacks
    },
    {
      id: 5,
      name: "Milktea Series",
      category: "milkteaSeries",
      image: milkteaSeries
    },
  ];

  const handleMenuItemClick = (product) => {
    setSelectedProduct(product.category);
    
  console.log('Selected Product:', product.name);
    onMenuItemChange(product.category);
  };

  return (
    <div className='menuDashboard'>
     
         <div className='menuCards'>
      {menu.map((item) => (
        
          <div
            key={item.id}
            className={`menuCard ${selectedProduct === item.name ? 'selected' : ''}`}
            onClick={() => handleMenuItemClick(item)}
          >
              <img className='menuImage' src={item.image} alt="" />
            <p className="menuName">{item.name}</p>
          </div> 
         
        ))}
      </div>
    
     
      
    </div>
  );
};

export default Menu;
