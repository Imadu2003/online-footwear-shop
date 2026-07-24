import { useState, useEffect } from 'react';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/users');
      const result = await res.json();
      if (result.success) setUsers(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete ${name}'s account?`)) {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, { method: 'DELETE' });
        if (res.ok) {
          alert("User deleted successfully!");
          fetchUsers(); // Refresh the list
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading users...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#111' }}>Manage Customers</h2>
      
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #eee' }}>
              <th style={thStyle}>Profile</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Joined</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={tdStyle}>
                  <img src={user.profileImage} alt={user.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                </td>
                <td style={{ ...tdStyle, fontWeight: 'bold', color: '#333' }}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: '0.3rem 0.6rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                    backgroundColor: user.role === 'admin' ? '#e0e7ff' : '#dcfce7',
                    color: user.role === 'admin' ? '#4f46e5' : '#16a34a'
                  }}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ ...tdStyle, color: '#666', fontSize: '0.9rem' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td style={tdStyle}>
                  {user.role !== 'admin' && ( // Admin කෙනෙක් නම් තවත් Admin කෙනෙක්ව මකන්න බෑ
                    <button 
                      onClick={() => handleDelete(user._id, user.name)}
                      style={{ padding: '0.4rem 0.8rem', backgroundColor: '#fee2e2', color: '#ef4444', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No users found.</div>
        )}
      </div>
    </div>
  );
}

const thStyle = { padding: '1rem', color: '#6b7280', fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase' };
const tdStyle = { padding: '1rem' };