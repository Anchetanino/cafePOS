import React from 'react';
import Logo from '../images/Logo.svg'
import coffee from '../images/Macchiato.jpg'


const Menu = (props) => {
    const menu = [
        {
            id: 1,
            name: "Drinks",            
            image: {Logo},        
        },
        {
            id: 2,
            name: "Dessert",          
            image:  {Logo}, 
        },
        {
            id: 3,
            name: "Meal",    
            image:  {Logo},    
        }
    
    ];
    return (
        
        <div className='menuDashboard'>
            {menu.map((props)=>{
        return (
            <div >
                <div className='menuList'>
                    <div key={props.id} className='menuCard'>
                        <img src={coffee} className='menuImage' alt="menu-image" />
                        {/* <div className='menuCard_details'> */}
                            <p className='menuName'>{props.name}</p>
                        {/* </div>  */}
                    </div>
                </div>
               
            </div>
       
       
    );
    })}
        </div>
    );
};

export default Menu;