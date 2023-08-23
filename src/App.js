import logo from './logo.svg';
import './App.css';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import NavBar from './components/nav/Navbar';
import Dashboard from './components/nav/Dashboard';
import OrderHistory from './components/nav/OrderHistory';
import Stocks from './components/nav/Stocks';
import ProductAvailable from './components/nav/ProductAvailable';


import './components/styles/style.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/nav/ProductList';

function App() {
  
  return (
    <div className="home">
      <BrowserRouter>    
        <Routes>
          <Route path='/' element={<Login/>}/>
        </Routes>
          <NavBar/>
        <Routes> 
          <Route path="dashboard" element={<Dashboard /> }/>
          <Route path="productsList" element={<ProductAvailable/> }/>
          <Route path="stocks" element={<Stocks/> }/>
          <Route path="history" element={<OrderHistory/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
