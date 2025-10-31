import React from 'react';
import SideBar from '../../component/global/side-bar';

const Layout = ({ children }) => {

  return (
    <div className="flex h-screen">
      <SideBar />
      
      <div className="flex-1 flex flex-col overflow-hidden overflow-y-auto">
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
