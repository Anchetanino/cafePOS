import React, { useState, useEffect, useRef } from 'react';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import { useLocation } from 'react-router-dom';

const OrderHistory = () => {
  const location = useLocation();
  console.log('Current Location:', location.pathname);

  const [orderHistory, setOrderHistory] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [filter, setFilter] = useState(''); // 'today' or 'all'
  const tableBodyRef = useRef(null);

  useEffect(() => {
    const fetchOrdersFromFirestore = async () => {
      try {
        const ordersCollection = collection(db, 'Orders'); // Reference to the "Orders" collection
        let ordersQuery = query(
          ordersCollection,
          orderBy('timestamp', 'desc'),
        );

        // Apply additional filtering based on the selected filter
        if (filter === 'today') {
          const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));
          ordersQuery = query(ordersQuery, where('timestamp', '>=', startOfToday));
        }

        const ordersSnapshot = await getDocs(ordersQuery);
        const ordersArray = [];

        ordersSnapshot.forEach((doc) => {
          const orderData = doc.data();
          ordersArray.push(orderData);
        });

        setOrderHistory(ordersArray);
        const totalAmount = calculateTotalAmount(ordersArray);
        setTotalSales(totalAmount);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrdersFromFirestore();
  }, [filter]);

  const calculateTotalAmount = (orders) => {
    return orders.reduce((total, order) => total + parseFloat(order.overallTotalPrice), 0);
  };

  return (
    <div className="orderHistoryDashboard">
      <div className="orderHistoryContainer">
        <div>
          <h2>Order History</h2>
          <div ref={tableBodyRef} style={{ overflowY: 'auto', height: '300px', border: '1px solid #ccc' }}>
            <div className="filterButtons">
              <button onClick={() => setFilter('today')}>Show Today's Orders</button>
              <button onClick={() => setFilter('all')}>Show All Orders</button>
            </div>
            {orderHistory && orderHistory.length > 0 ? (
              <table className="orderHistoryTable">
                <thead>
                  <tr>
                    <th className="unitPriceHistoryTable">Date</th>
                    <th className="nameHistoryTable">Orders</th>
                    <th className="totalPriceHistoryTable">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order, orderIndex) => (
                    <tr key={orderIndex}>
                      <td>
                        {new Date(order.timestamp.toDate()).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <ul>
                          {order.selectedProducts.map((product, productIndex) => (
                            <li key={productIndex}>
                              {product.productName} ({product.quantity} @ ${product.productSellingPrice})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>${order.overallTotalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
          <div className="totalSales">
            <p className="totalSalesWord">Total: ${totalSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
