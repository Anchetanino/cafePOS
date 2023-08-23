import React from 'react';

const OrderHistory = () => {
    const orderHistory = [
        {
            id: 1,
            name: "Oat Milk",
            unitPrice:50,
            quantity: 5,
            totalPrice:1500,
           
        },
        {
            id: 2,
            name: "Whole Milk",
            unitPrice:50,
            quantity: 5,
            totalPrice:1500,
           
        },
        {
            id: 3,
            name: "Coffee",
            unitPrice:50,
            quantity: 5,
            totalPrice:1500,
            
        }
    ]
    return (
        <div className='orderHistoryDashboard'>
            <div className='orderHistoryContainer'>
                <div>
                    <h2>Order History</h2>
                    <div className='orderHistoryButton'>
                        <button>Daily</button>
                        <button>Monthly</button>
                        <button>Annual</button>
                    </div>
                    <table className='orderHistoryTable'>
                     <tr>
                    <th className='nameHistoryTable'>Product Name</th>                    
                    <th className='unitPriceHistoryTable'>Product Price</th>
                    <th className='quantityHistoryTable'>Products Sold</th> 
                    <th className='totalPriceHistoryTable'>Total Amount</th>
                </tr>
                {orderHistory.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.unitPrice}</td>   
                            <td>{val.quantity}</td>
                            <td>{val.totalPrice}</td>                          
                        </tr>
                    )
                })}               
            </table>
            <div className='totalSales'>
                     <p className='totalSalesWord'>Total: 1500</p>
                </div>
                </div>

            </div> 
            
        </div>
    );
};

export default OrderHistory;