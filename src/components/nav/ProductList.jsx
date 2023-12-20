import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase'; // Import your Firebase configuration
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProductList = ({ category, onProductSelect }) => {
  const [products, setProducts] = useState([]);

  if (!category){
    category = "riceBowl"
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Create a query to get products with the selected category
        const productsCollection = collection(db, 'Products');
        const categoryQuery = query(productsCollection, where('productCategory', '==', category));
        console.log(categoryQuery)
        
        // Get the documents that match the query
        const querySnapshot = await getDocs(categoryQuery);

        const productsData = [];

        querySnapshot.forEach((doc) => {
          // Here, you can format the data as needed
          productsData.push({ id: doc.id, ...doc.data() });
        });

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (product) => {
    const isProductSelected = selectedProducts.some(
      (selectedProduct) => selectedProduct.id === product.id
    );

    if (isProductSelected) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.map((prevProduct) => {
          if (prevProduct.id === product.id) {
            return {
              ...prevProduct,
              quantity: prevProduct.quantity + 1,
              totalPrice: prevProduct.productSellingPrice * (prevProduct.quantity + 1),
            };
          }
          return prevProduct;
        })
      );

      onProductSelect((prevSelectedProducts) =>
        prevSelectedProducts.map((prevProduct) => {
          if (prevProduct.id === product.id) {
            return {
              ...prevProduct,
              quantity: prevProduct.quantity + 1,
              totalPrice: parseFloat(prevProduct.productSellingPrice * (prevProduct.quantity + 1)),
            };
          }
          return prevProduct;
        })
      );
    } else {
      const newProduct = {
        id: product.id,
        uuid: product.uuid, // Include the UUID in the data
        productName: product.productName,
        productSellingPrice: product.productSellingPrice,
        quantity: 1,
        totalPrice: parseFloat(product.productSellingPrice),
      };

      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        newProduct,
      ]);
      onProductSelect((prevSelectedProducts) => [
        ...prevSelectedProducts,
        newProduct,
      ]);
    }
  };

  return (
    <div className='productDashboard'>
      {products.map((product) => {
        return (
          <div key={product.id} className='productList'>
            <div
              className='productCard'
              onClick={() => handleProductClick(product)}
            >
              <img src={product.imageUrl} className='productImage' alt="product-image" />
              <div className='productCard_details'>
                <h3 className='productName'>{product.productName}</h3>
                <div className='productPrice'>${product.productSellingPrice}</div>
                <div className='productDetails'>{product.productDetails}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
