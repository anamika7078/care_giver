import React from 'react';
import { Outlet } from 'react-router-dom';

const PortalLayout = () => {
  return (
    <div className="portal-layout">
      <header>
        <h1>Portal</h1>
        {/* Add your portal header content here */}
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        {/* Add your footer content here */}
      </footer>
    </div>
  );
};

export default PortalLayout;
