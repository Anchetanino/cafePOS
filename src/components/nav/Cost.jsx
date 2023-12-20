import React, { useRef, useState } from 'react';
import {ref as dbref, set, child, push} from 'firebase/database';
import { db } from '../../Firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const Cost = ({ selectedProducts,  setSelectedProducts, setOverallTotalPrice }) => {
 
      const overallTotalPrice = selectedProducts.reduce((total, product) => total + parseFloat(product.totalPrice), 0);
    console.log(`Total Price: ${overallTotalPrice}`)

    const tableBodyRef = useRef(null);

    if (tableBodyRef.current) {
        tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
      }


      const saveDataToDatabase = async (selectedProducts, overallTotalPrice) => {
        try {
          const ordersCollection = collection(db, 'Orders'); 
          const orderData = {
            selectedProducts: selectedProducts.map(product => ({
              productName: product.productName,
              productSellingPrice: product.productSellingPrice,
              quantity: product.quantity,
              totalPrice: product.totalPrice,
              uuid: product.uuid, // Include the UUID in the data
            })),
            overallTotalPrice,
            timestamp: Timestamp.now(),
          };
          
          // Add a new document to the "Orders" collection
          const docRef = await addDoc(ordersCollection, orderData);
          
          
          alert('Confirm order.');
          setSelectedProducts([]); // Clear the selectedProducts array
          setOverallTotalPrice(0);
          window.location.reload()

          console.log('Data saved to Firestore with ID: ', docRef.id);
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
    const handleConfirmOrder = () => {
      
        saveDataToDatabase(selectedProducts, overallTotalPrice);
        // You can also reset the selectedProducts and overallTotalPrice here
        
      };

      const handleCancelOrder = () => {
        const confirmed = window.confirm('Are you sure you want to cancel the order?'); // Display a confirmation dialog
      
        if (confirmed) {
          // If the customer confirms, reset the selectedProducts and overallTotalPrice
          setSelectedProducts([]);
          setOverallTotalPrice(0);
          window.location.reload()
          
        }
      };
    return (
        <div className='costDashboard'>
            <div className='costContainer'>
                <div>
                    <h2>Check Out</h2>
                    <div className='scrollable-table'
            ref={tableBodyRef}
            style={{ overflowY: 'auto', height: '300px', border: '1px solid #ccc' }}
         >
             <table className='costTable'>
                    <thead>
                        <tr>
                            <th className='nameCostTable'>Name</th>
                            <th className='unitCostPriceTable'>Unit Price</th>
                            <th className='quantityCostTable'>Quantity</th>
                            <th className='totalCostPriceTable'>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {selectedProducts.map((product, index) => ( // Added 'index' as the second argument
    <tr key={index}> {/* Use 'index' as the key */}
      <td>{product.productName}</td>
      <td>${product.productSellingPrice}</td>
      <td>{product.quantity}</td>
      <td>{product.totalPrice}</td>
      {/* Add other table cells as needed */}
    </tr>
  ))}
                    </tbody>
                    </table>
         </div>
                   
                <div className='totalCost'>
                     <p className='totalCostWord'>Total: ${overallTotalPrice}</p>
                </div>
            <div className='costButton'>
                <button onClick={handleCancelOrder}>Cancel</button>
            <button onClick={handleConfirmOrder}>Confirm</button> 
            </div>
            
                </div>

            </div> 
            
        </div>
    );
};

export default Cost;