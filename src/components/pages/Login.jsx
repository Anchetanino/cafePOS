import React, { useState } from 'react';
import Logo from '../images/Logo.svg';
import Add from '../images/Add.svg';
import { useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const Login = () => {
    const [modal, setModal] = useState(false);
    const [authUser, setAuthUser] = useState(null); // State to store the authenticated user
    
    
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }
      const [err,setErr] = useState(false);
      const navigate = useNavigate();
  
      const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
    
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          // Use onAuthStateChanged to get the updated user profile
          onAuthStateChanged(auth, (user) => {
            if (user) {
              // Set the authenticated user profile in the parent component
              setAuthUser({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              });
            }
          });
    
          // Navigate to the dashboard or other pages
          navigate("/dashboard");
        } catch (err) {
          setErr(true);
        }
      };
      const [error,setError] = useState(false);
      const [loading, setLoading] = useState(false);
     
  const handleRegister = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile in Firebase Authentication
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Create user in Firestore
            await setDoc(doc(db, "Users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Redirect or perform other actions after successful registration
            navigate("/dashboard");
          } catch (error) {
            console.error('Error creating user:', error);
            setError('Something went wrong in making your account.');
            setLoading(false);
          }
        });
      });
    } catch (error) {
      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email is already in use.');
        setError('Email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        console.error('Invalid email format.');
        setError('Invalid email format.');
      } else if (error.code === 'auth/weak-password') {
        console.error('Weak password. Choose a stronger password.');
        setError('Weak password. Choose a stronger password.');
      } else {
        console.error('Error creating user:', error.message);
        setError('Error creating user:');
      }
    }
  };
    return (
        <div className='logIn'>
            {/* <img src={Background} className='bg-image' alt="Background Image" /> */}
            
            <div className='logInContainer'>
                <img src={Logo} alt="I Love Bird's Cafe" width="150px" height="115px"/>
                <p className='logInHeader'>Log In Here!</p>
                <form action="" onSubmit={handleSubmit}>
                    <input type="email" placeholder='Enter email.'  required/>
                    <input type="password" placeholder='Enter Password.'  required/>
                    {/* <input type="submit" value="Sign In" /> */}
                    <button className='signButton' >Sign In</button>
                </form>

                {err && (<span className='err '>You have entered wrong email or password.</span>)}
                <span className='registerAccount'>Don't have an account yet? <button className='registerButton' onClick={toggleModal}>Register Here! </button> </span>
            </div>

            {modal && (
                <div className='modal'>
                    <div onClick={toggleModal} className='overlay'> </div>
                    <div className='modal-content'>
                        <p>Register Here!</p>
                        <form action="" onSubmit={handleRegister}>
                            <input type="text" placeholder='Username'/>
                            <input type="email" placeholder='Email'/>
                            <input type="password" placeholder='Password'/>
                            <input type="file" className='addImageLogo' id="file"/>
                                <label className='addImageLogoText' htmlFor="file"><img src={Add} className='imgReg' alt="" />
                                <span>Add profile here.</span></label>
                            <button>Confirm</button>
                            <button onClick={toggleModal}>Close</button>

                        </form>
                        {loading && "Uploading and compressing the image please wait..."}
                    {error && <span>{error}</span>}
             
                    </div>
                </div>
           
            )}  
        </div>
    );
};

export default Login;