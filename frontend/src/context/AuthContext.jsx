import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function with Dummy Credentials
  const login = (email, password) => {
    // Dummy validation
    if (email === 'admin@test.com' && password === '123') {
      const dummyUser = { email: 'admin@test.com', role: 'admin' };
      setUser(dummyUser);
      localStorage.setItem('adminUser', JSON.stringify(dummyUser));
      return true; // Login success
    }
    return false; // Login failed
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};
