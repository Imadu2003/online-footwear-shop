import { useState, useEffect } from 'react';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/contact');
        const result = await res.json();
        if (result.success) {
          setContacts(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) return <div style={{ padding: '2rem' }}>Loading messages...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#111' }}>Customer Inquiries</h2>
      
      {contacts.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {contacts.map((msg) => (
            <div key={msg._id} style={{
              backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #eee'
            }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#333' }}>{msg.name}</h3>
              <p style={{ color: '#0066cc', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg.email}</p>
              
              <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '6px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Subject: {msg.subject || 'No Subject'}</p>
                <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.5' }}>{msg.message}</p>
              </div>
              
              <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '1rem', textAlign: 'right' }}>
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}