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
import {BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import ProductList from './components/nav/ProductList';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './Firebase';

const fetchUserProfile = async (email) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'Users'), where('email', '==', email)));
const data = querySnapshot.docs.map(doc => doc.data());

return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

const App = () => {
  const allowedEmail = 'birdcafe123@gmail.com';
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfileData = async () => {
      console.log('Fetching user profile...');
      const profile = await fetchUserProfile(allowedEmail);
      console.log('User profile:', profile);
      setUserProfile(profile);
    };

    fetchUserProfileData();
  }, [allowedEmail]);

  useEffect(() => {
    const storedUserProfile = JSON.parse(localStorage.getItem('authenticatedUser'));

    // If a user profile is stored, use it initially
    if (storedUserProfile) {
      setUserProfile(storedUserProfile);
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userProfile = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };

        setUserProfile(userProfile);

        // Save the user profile in localStorage
        localStorage.setItem('authenticatedUser', JSON.stringify(userProfile));
      } else {
        // No user is signed in
        setUserProfile(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array to run only on mount and unmount

  useEffect(() => {
    // Store user profile in localStorage whenever it changes
    localStorage.setItem('authenticatedUser', JSON.stringify(userProfile));
  }, [userProfile]);

  const setAuthUser = (user) => {
    console.log('Setting auth user:', user);
    setUserProfile(user);
    console.log('UserProfile after login:', user);
    console.log('UserProfile after login:', user.email);
    console.log('Current Path:', window.location.pathname);
  };

  return (
    <div className="home">
      <BrowserRouter>
        <Routes>
<Route
          path="/"
          element={
            userProfile ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setAuthUser={setAuthUser} />
            )
          }
        />          <Route path="/login" element={<Login setAuthUser={setAuthUser} />} />
        </Routes>
        
 

        {userProfile && window.location.pathname !== '/login' && (
          <NavBar userProfile={userProfile} />
        )}
        <Routes>
          
          <Route
            path="/dashboard"
            element={<Dashboard userProfile={userProfile} />}
          />
          <Route
            path="/productsList"
            element={ 
              userProfile && userProfile.email !== allowedEmail ? (
                <Navigate to="/dashboard" userProfile={userProfile}/>
              ) : (
                <ProductAvailable userProfile={userProfile}/>
              )
            }
          />

          <Route
            path="/history"
            element={<OrderHistory userProfile={userProfile} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;