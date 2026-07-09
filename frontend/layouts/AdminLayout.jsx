export default function MainLayout({ children }) {
  return (
    <div className="main-layout">   
        <header className="main-layout-header">
            <h1>Online Footwear Shop</h1>
        </header>
        <main className="main-layout-content">
            {children}
        </main>
        <footer className="main-layout-footer">
                <p>&copy; 2024 Online Footwear Shop. All rights reserved.</p>
        </footer>
    </div>
  );
}