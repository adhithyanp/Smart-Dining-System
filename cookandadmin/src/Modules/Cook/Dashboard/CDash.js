import React, { useState } from 'react';
import Navbar from '../../../Components/Navbar/Navbar';
import Order from './Order/Order';
import Available from './Available/Available'; 
import './CDash.css'; // Import the CSS file

function CDash() {
  const [activeComponent, setActiveComponent] = useState('orders'); 

  return (
    <div className="container"> {/* Apply the CSS class */}
      <Navbar setActiveComponent={setActiveComponent} /> 
      {activeComponent === 'orders' && <Order />}
      {activeComponent === 'availableFoods' && <Available />} 
    </div>
  );
}

export default CDash;
