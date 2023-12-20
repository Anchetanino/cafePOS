import React, { useEffect, useRef, useState } from 'react';
import Add from '../images/Add.svg';
import Delete from '../images/Delete.svg';
import Update from '../images/Update.svg';
import { uid } from 'uid';
import { collection, doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../Firebase';

const Stocks = () => {
  const [modal, setModal] = useState(false);
  const tableBodyRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const toggleModal = () => {
    setModal(!modal);
    setIsEditing(false);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const [stocksName, setStocksName] = useState('');
  const [stocksPrice, setStocksPrice] = useState('');
  const [stocksAvailable, setStocksAvailable] = useState('');
  const [stocks, setStocks] = useState([]);

  const uuid = uid();

  const addStocksToTheDatabase = async () => {
    if (!stocksName || !stocksPrice || !stocksAvailable) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const stocksData = {
        uuid,
        stocksName,
        stocksPrice,
        stocksAvailable,
      };

      const stocksCollectionRef = collection(db, 'Stocks');
      await setDoc(doc(stocksCollectionRef, uuid), stocksData);

      if (tableBodyRef.current) {
        tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
      }

      setStocksName('');
      setStocksPrice('');
      setStocksAvailable('');

      alert('Stock is Added.');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocksCollectionRef = collection(db, 'Stocks');
        const stocksSnapshot = await getDocs(stocksCollectionRef);
        const stocksData = [];
        stocksSnapshot.forEach((doc) => {
          stocksData.push({ uuid: doc.id, ...doc.data() });
        });
        setStocks(stocksData);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();
  }, []);

  const editStock = (uuid) => {
    const stockToEdit = stocks.find((stock) => stock.uuid === uuid);
    if (stockToEdit) {
      setEditingStock({ ...stockToEdit });
      setIsEditing(true);
      toggleModal();
    }
  };

  const updateStock = async () => {
    if (!editingStock.stocksName || !editingStock.stocksPrice || !editingStock.stocksAvailable) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const stocksRef = doc(db, 'Stocks', editingStock.uuid);
      await updateDoc(stocksRef, {
        stocksName: editingStock.stocksName,
        stocksPrice: editingStock.stocksPrice,
        stocksAvailable: editingStock.stocksAvailable,
      });

      alert('Stock updated successfully.');
      setIsEditing(false);
      toggleModal();
    } catch (error) {
      console.error('Error updating stocks:', error);
    }
  };

  const deleteStock = async (uuid) => {
    try {
      const stocksRef = doc(db, 'Stocks', uuid);
      await deleteDoc(stocksRef);
      setStocks((prevStocks) => prevStocks.filter((stock) => stock.uuid !== uuid));
      alert('Stock deleted successfully.');
    } catch (error) {
      console.error('Error deleting stocks:', error);
    }
  };

  return (
    <div className='stocksDashboard'>
      <div className='stocksContainer'>
        <div>
          <p>Available Raw Materials</p>
          <div
            className='scrollable-table'
            ref={tableBodyRef}
            style={{ overflowY: 'auto', height: '300px', border: '1px solid #ccc' }}
          >
            <table className='stocksTable'>
              <tr>
                <th className='nameStocksTable'>Item Name</th>
                <th className='quantityStocksTable'>Available Stocks</th>
                <th className='unitPriceStocksTable'>Price</th>
              </tr>
              {stocks.map((stock) => (
                <tr key={stock.uuid}>
                  <td>{stock.stocksName}</td>
                  <td>{stock.stocksAvailable}</td>
                  <td>{stock.stocksPrice}</td>
                  <td>
                    <button onClick={() => editStock(stock.uuid)}>
                      <img src={Update} alt='' /> Edit
                    </button>
                    <button onClick={() => deleteStock(stock.uuid)}>
                      <img src={Delete} alt='' /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div className='stocksButton'>
            <button onClick={toggleModal}>
              <img src={Add} alt='' /> Add
            </button>
            <button>
              <img src={Update} alt='' /> Update
            </button>
            <button>
              <img src={Delete} alt='' /> Delete
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            {isEditing ? <p>Edit Stock</p> : <p>Add Stock</p>}
            <div className='form'>
              <input
                type='text'
                placeholder='Item Name'
                value={isEditing ? editingStock.stocksName : stocksName}
                onChange={(e) =>
                  isEditing
                    ? setEditingStock({
                        ...editingStock,
                        stocksName: e.target.value,
                      })
                    : setStocksName(e.target.value)
                }
              />
              <input
                type='number'
                placeholder='Price'
                value={isEditing ? editingStock.stocksPrice : stocksPrice}
                onChange={(e) =>
                  isEditing
                    ? setEditingStock({
                        ...editingStock,
                        stocksPrice: e.target.value,
                      })
                    : setStocksPrice(e.target.value)
                }
              />
              <input
                type='number'
                placeholder='Available Stocks'
                value={isEditing ? editingStock.stocksAvailable : stocksAvailable}
                onChange={(e) =>
                  isEditing
                    ? setEditingStock({
                        ...editingStock,
                        stocksAvailable: e.target.value,
                      })
                    : setStocksAvailable(e.target.value)
                }
              />
              <button onClick={isEditing ? updateStock : addStocksToTheDatabase}>
                {isEditing ? 'Update' : 'Confirm'}
              </button>
              <button onClick={() => toggleModal()}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;
