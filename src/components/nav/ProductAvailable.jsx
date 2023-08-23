import React, { useState } from 'react';
import Add from '../images/Add.svg';
import Delete from '../images/Delete.svg';
import Update from '../images/Update.svg';


const ProductAvailable = () => {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }

    const productAvailable = [
        {
            id: 1,
            name: "Coffee",
            price:50,
            madeProducts: 5,
            image: 5,
            details: "espresso, hot milk, foam milk",            
            category: "drinks",
            sold: 5,
            available: 5, 
        },
        {
            id: 2,
            name: "Coffee",
            price:50,
            madeProducts: 5,
            image: 5,
            details: "espresso, hot milk, foam milk",            
            category: "drinks",
            sold: 5,
            available: 5,         
        },
        {
            id: 3,
            name: "Coffee",
            price:50,
            madeProducts: 5,
            image: 5,
            details: "espresso, hot milk, foam milk",            
            category: "drinks",
            sold: 5,
            available: 5, 
        }
    ];
    return (
        <div className='productAvailableDashboard'>
            <div className='productAvailableContainer'>
                <div>
                    <p>Available Product</p>
                    <div>

                    </div>
                    <table className='productAvailableTable'>
                     <tr>
                        <th className='imageAvailableTable'> Image</th>
                    <th className='nameAvailableTable'>Name</th>                    
                    <th className='detailsAvailableTable'>Details</th>    
                    <th className='categoryAvailableTable'>Category</th>                 
                    <th className='quantityAvailableTable'>Total Product Made</th> 
                    <th className='soldAvailableTable'>Total Sold</th> 
                    <th className='leftAvailableTable'>Available Products</th> 
                    <th className='unitPriceAvailableTable'>Selling Price</th>
                </tr>
                {productAvailable.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.image}</td>
                            <td>{val.name}</td>
                            <td>{val.details}</td>
                            <td>{val.category}</td>
                            <td>{val.madeProducts}</td> 
                            <td>{val.sold}</td>
                            <td>{val.available}</td>
                            <td>{val.price}</td>                            
                        </tr>
                    )
                })}               
            </table>
            <div className='productAvailableButton'>
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
                            <input type="text" placeholder='Product Name'/>
                            <input type="text" placeholder='Product Category'/>
                            <input type="file" className='addImageLogo' id="file"/>
                                <label className='addImageLogoText' htmlFor="file"><img src={Add} className='imgReg' alt="" />
                                <span>Add image here.</span></label>
                            <input type="text" placeholder='Product Details'/>
                            <input type="text" placeholder='Selling Price'/>
                            <input type="text" placeholder='Total Product Made'/>
                            <button>Confirm</button>
                            <button onClick={toggleModal}>Close</button>

                        </form>
                    </div>
                </div>
           
            )}  
            
        </div>
    );
};

export default ProductAvailable;