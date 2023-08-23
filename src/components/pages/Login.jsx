import React, { useState } from 'react';
import Logo from '../images/Logo.svg';
import { useNavigate, Link } from "react-router-dom";
import Background from '../images/Background.svg';
import Add from '../images/Add.svg';


const Login = () => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal');
      } else {
        document.body.classList.remove('active-modal');
      }
    
    return (
        <div className='logIn'>
            {/* <img src={Background} className='bg-image' alt="Background Image" /> */}
            
            <div className='logInContainer'>
                <img src={Logo} alt="I Love Bird's Cafe" width="150px" height="115px"/>
                <p className='logInHeader'>Log In Here!</p>
                <form action="">
                    <input type="text" placeholder='Enter Username.' required/>
                    <input type="password" placeholder='Enter Password.' required/>
                    {/* <input type="submit" value="Sign In" /> */}
                    <button className='signButton' ><Link className='signInButton' to='/dashboard'>Sign In</Link></button>
                </form>
                <p className='registerAccount'>Don't have an account yet? <button className='registerButton' onClick={toggleModal}>Register Here! </button> </p>
            </div>

            {modal && (
                <div className='modal'>
                    <div onClick={toggleModal} className='overlay'> </div>
                    <div className='modal-content'>
                        <p>Register Here!</p>
                        <form action="">
                            <input type="text" placeholder='Username'/>
                            <input type="password" placeholder='Password'/>
                            <input type="email" placeholder='Email'/>
                            <input type="file" className='addImageLogo' id="file"/>
                                <label className='addImageLogoText' htmlFor="file"><img src={Add} className='imgReg' alt="" />
                                <span>Add profile here.</span></label>
                            <button>Confirm</button>
                            <button onClick={toggleModal}>Close</button>

                        </form>
                    </div>
                </div>
           
            )}  
        </div>
    );
};

export default Login;