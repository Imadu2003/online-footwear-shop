import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar'; // Navbar eka import karaganna

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar /> {/* Header eka wenuwata Navbar eka danna */}
      
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Outlet /> {/* Me thanin thamai anith pages load wenne */}
      </main>
      
      <footer style={{ backgroundColor: '#212529', color: 'white', textAlign: 'center', padding: '1rem' }}>
        © 2026 Shoe Store. All rights reserved.
      </footer>
    </div>
  );
}