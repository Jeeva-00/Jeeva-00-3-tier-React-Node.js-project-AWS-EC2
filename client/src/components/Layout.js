import React, { useState } from 'react';

import InfoPopup from './InfoPopup';


function Layout({ children }) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div className="app-layout" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <div className="app-body" style={{ position: 'relative', zIndex: 1 }}>
        <main className="main-content fade-in">
          {children}
        </main>
      </div>
      <button className="help-btn" onClick={() => setShowInfo(true)}>i</button>
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
    </div>
  );
};

export default Layout;
