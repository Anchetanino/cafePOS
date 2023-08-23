import React from 'react';

const Cost = () => {
    const sold = [
        {
            id: 1,
            name: "Mocha",
            unitPrice:50,
            totalPrice:50,
            quantity: 5,
            totalCost: 1500,
        },
        {
            id: 1,
            name: "Mocha",
            unitPrice:50,
            totalPrice:50,
            quantity: 5,
            totalCost: 1500,
        },
        {
            id: 1,
            name: "Mocha",
            unitPrice:50,
            totalPrice:50,
            quantity: 5,
            totalCost: 1500,
        }
    ]
    return (
        <div className='costDashboard'>
            <div className='costContainer'>
                <div>
                    <h2>Check Out</h2>
                    <table className='costTable'>
                        <tr>
                            <th className='nameCostTable'>Name</th>                    
                            <th className='unitCostPriceTable'>Unit Price</th>
                            <th className='quantityCostTable'>Quantity</th> 
                            <th className='totalCostPriceTable'> Total Price </th>
                        </tr>
                {sold.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.quantity}</td>
                            <td>{val.unitPrice}</td>      
                            <td>{val.totalPrice}</td>                         
                        </tr>
                        )
                            })}       
                    </table>
                <div className='totalCost'>
                     <p className='totalCostWord'>Total: 1500</p>
                </div>
            <div className='costButton'>
                <button>Cancel</button>
            <button>Confirm</button> 
            </div>
            
                </div>

            </div> 
            
        </div>
    );
};

export default Cost;