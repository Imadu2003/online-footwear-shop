import { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);



  //The actual API for resgistering a new user
  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();
      return { success: response.ok, message: data.message };
    } catch (error) {
      return { success: false, message: 'Server error. Is backend running?' };
    }
  };


  //The actual API for logging in a user
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // Store user data in localStorage

        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };



  const updateUserDetails = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      const data = await response.json();

      if (response.ok) {
        setUser(data);

        localStorage.setItem('user', JSON.stringify(data));
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'Server error' };
    }
  };







   const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // පරණ යූසර්ගේ Cart එකත් Local Storage එකෙන් මකලා දානවා
    localStorage.removeItem('cartItems'); 
    
    // ලොගින් පිටුවට යවන ගමන්ම සයිට් එක රීලෝඩ් කරනවා (එතකොට React එකේ මතකයත් අලුත් වෙනවා)
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, login, logout, updateUserDetails, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);