import React, { useState } from 'react';
import Add from '../images/Add.svg';
import Delete from '../images/Delete.svg';
import Update from '../images/Update.svg';


const Stocks = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }

    const stocks = [
        {
            id: 1,
            name: "Oat Milk",
            price:50,
            quantity: 5,
           
        },
        {
            id: 2,
            name: "Whole Milk",
            price:50,
            quantity: 5,
           
        },
        {
            id: 3,
            name: "Coffee",
            price:50,
            quantity: 5,
            
        }
    ]
    return (
        <div className='stocksDashboard'>
            <div className='stocksContainer'>
                <div>
                    <p>Available Raw Materials</p>
                    <table className='stocksTable'>
                     <tr>
                    <th className='nameStocksTable'>Item Name</th>                    
                    <th className='quantityStocksTable'>Available Stocks</th> 
                    <th className='unitPriceStocksTable'>Price</th>
                </tr>
                {stocks.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.quantity}</td>
                            <td>{val.price}</td>                            
                        </tr>
                    )
                })}               
            </table>
            <div className='stocksButton'>
                <button onClick={toggleModal}> <img src={Add} alt="" /> Add</button>
                <button> <img src={Update} alt="" />Update</button> 
                <button> <img src={Delete} alt="" />Delete</button>
            </div>
            
                </div>

            </div> 

            {modal && (
                <div className='modal'>
                    <div onClick={toggleModal} className='overlay'> </div>
                    <div className='modal-content'>
                        <p>Product Details</p>
                        <form action="">
                            <input type="text" placeholder='Item Name'/>
                            <input type="text" placeholder='Price'/>
                            <input type="text" placeholder='Available Stocks'/>
                            <button>Confirm</button>
                            <button onClick={toggleModal}>Close</button>

                        </form>
                    </div>
                </div>
           
            )}  
        </div>
    );
};

export default Stocks;