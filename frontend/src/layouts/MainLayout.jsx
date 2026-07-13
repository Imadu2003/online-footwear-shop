import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar'; // Navbar eka import karaganna
import Footer from '../components/common/Footer'; // Footer eka import karaganna

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar /> {/* Header eka wenuwata Navbar eka danna */}
      
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <Outlet /> {/* Me thanin thamai anith pages load wenne */}
      </main>
      
      <Footer/>
    </div>
  );
}