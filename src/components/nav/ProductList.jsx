import React from 'react';
import Logo from '../images/Logo.svg';
import coffee from '../images/Macchiato.jpg'
import InfiniteScroll from 'react-infinite-scroll-component';

const ProductList = (props) => {
    const products = [
        {
            id: 1,
            name: "Coffee Macchiato",
            price: 1,
            image: {Logo},
            details: "Espresso Coffee, Whole Milk, Steam Milk",
        },
        {
            id: 2,
            name: "Cafe Americano",
            price: 2,
            image:  {Logo},
            details: "Espresso Coffee, Whole Milk, Steam Milk",
        },
        {
            id: 3,
            name: "Cafe Latte",
            price: 3,
            image:  {Logo},
            details: "Espresso Coffee, Steamed Milk, Foam",
        },
        {
            id: 4,
            name: "Cafe Cappuccino",
            price: 4,
            image:  {Logo},
            details: "Espresso Coffee, Steamed Milk, Foam",
        },
        {
            id: 5,
            name: "Cafe Mocha",
            price: 5,
            image: {Logo},
            details: "Espresso Coffee, Chocolate, Steamed Milk",
        },
        {
            id: 6,
            name: "Cafe Mocha",
            price: 6,
            image: {Logo},
            details: "Espresso Coffee, Chocolate, Steamed Milk",
        },
        {
            id: 7,
            name: "Cafe Mocha",
            price: 7,
            image: {Logo},
            details: "Espresso Coffee, Chocolate, Steamed Milk",
        },
        {
            id: 8,
            name: "Cafe Mocha",
            price: 8,
            image: {Logo},
            details: "Espresso Coffee, Chocolate, Steamed Milk",
        },
        {
            id: 9,
            name: "Cafe Mocha",
            price: 9,
            image: {Logo},
            details: "Espresso Coffee, Chocolate, Steamed Milk",
        }
    
    ];
    return (
        <div className='productDashboard'>
    {products.map((props)=>{
        return (
            <div>
                <div className='productList'>
                    <div key={props.id} className='productCard'>
                        <img src={coffee} className='productImage' alt="product-image" />
                        <div className='productCard_details'>
                            <h3 className='productName'>{props.name}</h3>
                            <div className='productPrice'>${props.price}</div>
                            <div className='productDetails'>{props.details}</div>
                        </div> 
                    </div>
                </div>
               
            </div>
       
       
    );
    })}
        </div>
        
    )
    
};

export default ProductList;