import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import '../admin.css';

export default function AdminLayout() {
  const location = useLocation();

  // Determine page title based on the path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
      case '/admin/':
        return 'Dashboard';
      case '/admin/products':
        return 'Manage Products';
      case '/admin/orders':
        return 'Manage Orders';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h2>{getPageTitle()}</h2>
          </div>
          <div className="header-actions">
            <div className="header-search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" placeholder="Search admin panel..." />
            </div>
            <button className="header-btn" title="View Store">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          </div>
        </header>
        <main className="admin-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
