import React, { useState, useEffect } from 'react';
import "./Navbar.css";
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({ setActiveComponent }) { // Accept setActiveComponent as a prop
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponentLocal] = useState('orders'); // Local state to manage active component
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/adash') {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const switchComponent = (componentName) => {
    setActiveComponentLocal(componentName); // Update local state
    setActiveComponent(componentName); // Update parent state
    setSidebarOpen(false); 
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className='Navbar'>
      <div className="navbar-container">
        <div className="navbar-header">
          <div
            className={`hamburger ${sidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <h1>Food and Bev Station</h1>
        </div>
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <ul>
            {location.pathname === '/adash' && ( // Render sidebar options only for '/adash' page
              <>
                <li className={`category-item ${activeComponent === 'payments' ? 'active' : ''}`} onClick={() => switchComponent('payments')}>Payments</li>
                <li className={`category-item ${activeComponent === 'cooks' ? 'active' : ''}`} onClick={() => switchComponent('cooks')}>Cooks</li>
                <li className="category-item" onClick={handleLogout}>Logout</li>
              </>
            )}
            {location.pathname !== '/adash' && ( // Render default sidebar options for other pages
              <>
                <li className={`category-item ${activeComponent === 'orders' ? 'active' : ''}`} onClick={() => switchComponent('orders')}>Orders</li>
                <li className={`category-item ${activeComponent === 'availableFoods' ? 'active' : ''}`} onClick={() => switchComponent('availableFoods')}>Available Foods</li>
                <li className="category-item" onClick={handleLogout}>Logout</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
