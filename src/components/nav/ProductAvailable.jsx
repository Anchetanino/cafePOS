import React, { useState, useEffect, useRef } from 'react';
import Add from '../images/Add.svg';
import Delete from '../images/Delete.svg';
import Update from '../images/Update.svg';
import firebase, { db } from '../../Firebase'; // Import your Firebase configuration
import {setDoc, doc, collection, getDocs, updateDoc, deleteDoc, addDoc, query, where, onSnapshot, getDoc} from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, getStorage, uploadBytes,} from 'firebase/storage';
import { uid } from 'uid';

const ProductAvailable = () => {
    // State variables for form inputs
  const [modal, setModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const tableBodyRef = useRef(null);
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [productSellingPrice, setProductSellingPrice] = useState('');
  const [productMadeProducts, setProductMadeProducts] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({
    productName: '',
    productCategory: '',
    productDetails: '',
    productSellingPrice: '',
    productMadeProducts: '',
  }); 


  const toggleModal = () => {
    setModal(!modal);
  };


  useEffect(() => {
    fetchAvailableProducts();
  }, []);
  
  const fetchAvailableProducts = async () => {
    try {
      const productsCollection = collection(db, 'Products');
      const availableProductsQuery = query(productsCollection);
      const querySnapshot = await getDocs(availableProductsQuery);
      const productsData = [];
  
      for (const doc of querySnapshot.docs) {
        const product = doc.data();
        const totalSold = await calculateTotalSold(product.uuid);
        // console.log(`Total sold for product ${product.uuid}: ${totalSold}`);
        productsData.push({ uuid: doc.id, ...product, totalSold });
      }
      // console.log('Products data after fetching:', productsData);
      setProducts(productsData);
  
      return productsData;
    } catch (error) {
      console.error('Error fetching available products:', error);
      return [];
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

   // Function to set the product to be edited
   const editProduct = async (uuid) => {
    try {
      // Create a query to find the document with the matching UUID
      const productsCollection = collection(db, 'Products');
      const productQuery = query(productsCollection, where('uuid', '==', uuid));
  
      // Execute the query
      const querySnapshot = await getDocs(productQuery);
  
      // Check if there are matching documents
      if (querySnapshot.size > 0) {
        // Get the ID of the first matching document
        const productId = querySnapshot.docs[0].id;
  
        // Fetch the current product details from the database
        const productSnapshot = await getDoc(doc(db, 'Products', productId));
  
        if (productSnapshot.exists()) {
          const productData = productSnapshot.data();
  
          setEditingProduct({
            uuid,
            productName: productData.productName,
            productCategory: productData.productCategory,
            productDetails: productData.productDetails,
            productSellingPrice: productData.productSellingPrice,
            productMadeProducts: productData.productMadeProducts,
          });
  
          toggleModal(); // Open the modal for editing
        } else {
          console.error('Product not found for editing:', uuid);
        }
      } else {
        console.log('No products found with the given UUID.');
      }
    } catch (error) {
      console.error('Error fetching product details for editing:', error);
    }
  };

  const getProductIdByUuid = async (uuid) => {
    try {
      // Create a query to find the document with the matching UUID
      const productsCollection = collection(db, 'Products');
      const productQuery = query(productsCollection, where('uuid', '==', uuid));

      // Execute the query
      const querySnapshot = await getDocs(productQuery);

      // Check if there are matching documents
      if (querySnapshot.size > 0) {
        // Assuming there is only one document with the given UUID
        const productId = querySnapshot.docs[0].id;
        return productId;
      } else {
        console.log('No product found with the given UUID.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product ID:', error);
      return null;
    }
  };
  // Function to add or update a product in the Firestore database
  const addOrUpdateProduct = async () => {
    // console.log('Before validation:', {
    //   productName,
    //   productDetails,
    //   productMadeProducts,
    //   productSellingPrice,
    //   productCategory,
    // });
  

    const existingProduct = products.find(
      (product) => product.productName === productName && product.productCategory === productCategory
    );
    
        const uuid = editingProduct.uuid || uid(); 
        const productId = editingProduct.uuid
        ? await getProductIdByUuid(editingProduct.uuid)
        : null;

    const existProduct = products.find(
      (product) => product.uuid === uuid
    );

  // Use uid() when it's a new product
  
    try {
      // Upload the image to Firebase Storage
      // Upload the image to Firebase Storage
    const storageDatabase = getStorage();
    const imageRef = storageRef(storageDatabase, `productImages/${uuid}`);
    
    
       // Check if the image is not changed
       const previousImageURL = existingProduct ? existingProduct.imageUrl : null;

       if (imageFile) {
         // Image is changed, upload the new image
         await uploadBytes(imageRef, imageFile);
       }
   
       // Get the download URL after the image is successfully uploaded
       const imageUrl = imageFile ? await getDownloadURL(imageRef) : previousImageURL;
   
    let productData;

      if (existingProduct) {
        // If the product already exists, update the "Total Product Made"
        const totalProductMade = parseInt(existingProduct.productMadeProducts, 10) + parseInt(productMadeProducts, 10);

        productData = {
          ...existingProduct,
          productMadeProducts: totalProductMade,
          imageUrl,
        };

        // Update the existing document
        const productRef = doc(db, 'Products', existingProduct.uuid);
        await updateDoc(productRef, productData);
      } else if(editingProduct.uuid ) {
         // If it's an edited product, use the retrieved product ID
         const productRef = doc(db, 'Products', productId);
        // console.log('Product Reference:', productRef); // Log the reference
        // console.log('Editing Product UUID:', editingProduct.uuid); // Log the UUID

        await updateDoc(productRef, editingProduct);
         window.location.reload()
      } else {

        if (!productName || !productDetails || !productMadeProducts || !productSellingPrice || !productCategory) {
          alert('Please fill in all fields.');
          return;
        }

        // If the product doesn't exist, add a new document to the Firestore collection
        productData = {
          uuid,
          productName,
          productDetails,
          productCategory,
          productSellingPrice: parseFloat(productSellingPrice),
          productMadeProducts: parseInt(productMadeProducts),
          imageUrl,
        };

        const productCollectionRef = collection(db, 'Products');
        await addDoc(productCollectionRef, productData);

        // Fetch the updated products from Firestore and update the state
        const updatedProducts = await fetchAvailableProducts();
        setProducts(updatedProducts);

        await calculateTotalSoldForProduct(uuid);
      }
    
        if (tableBodyRef.current) {
          tableBodyRef.current.scrollTop = tableBodyRef.current.scrollHeight;
        }
    
        // Clear the input fields and close the modal
        setProductName('');
        setProductCategory('');
        setProductDetails('');
        setProductSellingPrice('');
        setProductMadeProducts('');
        setImageFile(null);
        toggleModal();
    
        // Show a success message or perform other actions as needed
        alert(`Product ${editingProduct.uuid ? 'updated' : 'added'} successfully.`);
        window.location.reload()
      } catch (error) {
        console.error(`Error ${editingProduct.uuid ? 'updating' : 'adding'} product:`, error);
      }
  };


  // Delete function
  const deleteProduct = async (uuid) => {
    try {
      // Create a query to find the documents with the matching UUID
      const productsCollection = collection(db, 'Products');
      const productQuery = query(productsCollection, where('uuid', '==', uuid));
  
      // Execute the query
      const querySnapshot = await getDocs(productQuery);
  
      // Check if there are matching documents
      if (querySnapshot.size > 0) {
        // Iterate through the matching documents and delete each one
        querySnapshot.forEach(async (productDocument) => {
          const productId = productDocument.id;
  
          // Create a reference to the document and delete it
          const productRef = doc(db, 'Products', productId);
          await deleteDoc(productRef);
          alert ("Product has been deleted!")
          console.log(`Product with ID ${productId} successfully deleted.`);
          window.location.reload()
        });
      } else {
        console.log('No products found with the given UUID.');
      }
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const calculateTotalSoldForProduct = async (uuid) => {
    try {
      const totalSold = await calculateTotalSold(uuid);
      const productsCollection = collection(db, 'Products');
      const productRef = doc(productsCollection, uuid);
  
      // Update the 'totalSold' field in the product document
      await updateDoc(productRef, { totalSold });
    } catch (error) {
      console.error('Error calculating and updating total sold for product:', error);
    }
  };
  const calculateTotalSold = async (uuid) => {
    try {
      // console.log('Calculating total sold for product:', uuid);
      const ordersCollection = collection(db, 'Orders');
      const ordersQuery = query(ordersCollection);
      const orderSnapshots = await getDocs(ordersQuery);
  
      let totalSold = 0;
  
      // console.log('Order snapshots:', orderSnapshots.docs);
  
      orderSnapshots.forEach((orderDoc) => {
        const orderData = orderDoc.data();
        // console.log('Order data:', orderData);
  
        const selectedProducts = orderData.selectedProducts;
  
        if (selectedProducts && Array.isArray(selectedProducts)) {
          for (const product of selectedProducts) {
            const productUUID = product.uuid;
  
            if (productUUID === uuid) {
              // console.log('Order UUID:', orderDoc.id);
              // console.log('Quantity:', product.quantity);
              totalSold += product.quantity;
            }
          }
        }
      });
  
      // console.log('Total sold calculated:', totalSold);
  
      return totalSold;
    } catch (error) {
      console.error('Error calculating total sold:', error);
      return 0;
    }
  };
  

  return (
    <div className="productAvailableDashboard">
      <div className="productAvailableContainer">
        <div>
          <p>Available Product</p>
          <div
            className="scrollable-table"
            ref={tableBodyRef}
            style={{ overflowY: 'auto', height: '300px', border: '1px solid #ccc' }}
          >
            <table className="productAvailableTable">
              <thead>
                <tr>
                  <th className="imageAvailableTable">Image</th>
                  <th className="nameAvailableTable">Name</th>
                  <th className="detailsAvailableTable">Details</th>
                  <th className="categoryAvailableTable">Category</th>
                  <th className="quantityAvailableTable">Total Product Made</th>
                  <th className="soldAvailableTable">Total Sold</th>
                  <th className="leftAvailableTable">Available Products</th>
                  <th className="unitPriceAvailableTable">Selling Price</th>
                  <th>Action Needed</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.uuid}>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.productName}
                        style={{ width: '50px' }}
                      />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.productDetails}</td>
                    <td>{product.productCategory}</td>
                    <td>{product.productMadeProducts}</td>
                    <td>{product.totalSold}</td>
                    <td>
                      {product.productMadeProducts - product.totalSold}
                    </td>
                    <td>{product.productSellingPrice}</td>
                    <td>
                      <button
                        className="productAvailableButton"
                        onClick={() => editProduct(product.uuid)}
                      >
                        Update
                      </button>
                      <button
                        className="productAvailableButton"
                        onClick={() =>{
                          const uuid = product.uuid
                          deleteProduct(uuid)
                        }
                          
                        }
                      >
                        <img src={Delete} alt="" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="productAvailableAddButton" onClick={toggleModal}>
            <img src={Add} alt="" /> Add
          </button>
        </div>
      </div>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <p>{editingProduct.uuid ? 'Edit Product' : 'Add Product'}</p>
            <div className="form">
            <input
  type="text"
  placeholder="Product Name"
  value={editingProduct ? editingProduct.productName : productName}
  onChange={(e) =>
    editingProduct.uuid
      ? setEditingProduct({
          ...editingProduct,
          productName: e.target.value,
        })
      : setProductName(e.target.value)
  }
/>
              <select
                value={editingProduct ? editingProduct.productCategory : productCategory}
                onChange={(e) =>
                  editingProduct.uuid
                    ? setEditingProduct({
                        ...editingProduct,
                        productCategory: e.target.value,
                      })
                    : setProductCategory(e.target.value)
                }
                className="inputCategory"
              >
                <option value="birdsCombos">Bird's Combos</option>
                <option value="riceBowl">Rice Bowl</option>
                <option value="pizzaTreats">Pizza Treats</option>
                <option value="pastaSnacks">Pasta and Snacks</option>
                <option value="milkteaSeries">Milktea Series</option>
              </select>
              <input
                type="file"
                className="addImageLogo"
                id="file"
                onChange={handleImageChange}
              />
              <label className="addImageLogoText" htmlFor="file">
                <img src={Add} className="imgReg" alt="" />
                <span>Add image here.</span>
              </label>
              <input
                type="text"
                placeholder="Product Details"
                value={editingProduct ? editingProduct.productDetails : productDetails}
                onChange={(e) =>
                  editingProduct.uuid
                    ? setEditingProduct({
                        ...editingProduct,
                        productDetails: e.target.value,
                      })
                    : setProductDetails(e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Selling Price"
                value={editingProduct ? editingProduct.productSellingPrice : productSellingPrice}
                onChange={(e) =>
                  editingProduct.uuid
                    ? setEditingProduct({
                        ...editingProduct,
                        productSellingPrice: e.target.value,
                      })
                    : setProductSellingPrice(e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Total Product Made"
                value={editingProduct ? editingProduct.productMadeProducts : productMadeProducts}
                onChange={(e) =>
                  editingProduct.uuid
                    ? setEditingProduct({
                        ...editingProduct,
                        productMadeProducts: e.target.value,
                      })
                    : setProductMadeProducts(e.target.value)
                }
              />
              <button onClick={addOrUpdateProduct}>
              {editingProduct.uuid ? 'Update' : 'Add'}
              </button>
              <button onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAvailable;
