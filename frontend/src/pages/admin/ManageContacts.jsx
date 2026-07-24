import { useState, useEffect } from 'react';

export default function ManageContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({}); 

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contact');
      const result = await res.json();
      if (result.success) setContacts(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' })
      });
      fetchContacts(); 
    } catch (error) {
      console.error(error);
    }
  };

  const sendReply = async (id, email) => {
    if (!replyText[id]) return alert("Please type a reply first!");
    
    try {
      const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ replyMessage: replyText[id] })
      });
      if (res.ok) {
        alert(`Reply sent to ${email} successfully!`);
        setReplyText({ ...replyText, [id]: '' });
        fetchContacts();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send reply");
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading messages...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', color: '#111' }}>Customer Inquiries</h2>
      
      {contacts.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
          {contacts.map((msg) => (
            <div key={msg._id} style={{
              backgroundColor: 'white', padding: '1.5rem', borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)', 
              borderTop: `4px solid ${msg.status === 'unread' ? '#ff3b30' : msg.status === 'replied' ? '#34c759' : '#007aff'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#333', margin: 0 }}>{msg.name}</h3>
                <span style={{ 
                  fontSize: '0.75rem', padding: '0.3rem 0.6rem', borderRadius: '20px', fontWeight: 'bold',
                  backgroundColor: msg.status === 'unread' ? '#ffebe9' : msg.status === 'replied' ? '#e9fbee' : '#e9f0fb',
                  color: msg.status === 'unread' ? '#ff3b30' : msg.status === 'replied' ? '#34c759' : '#007aff'
                }}>
                  {msg.status.toUpperCase()}
                </span>
              </div>
              
              <p style={{ color: '#0066cc', fontSize: '0.9rem', marginBottom: '1rem' }}>{msg.email}</p>
              
              <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '6px', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Subject: {msg.subject || 'No Subject'}</p>
                <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.5' }}>{msg.message}</p>
              </div>

              {msg.status === 'unread' && (
                <button 
                  onClick={() => markAsRead(msg._id)}
                  style={{ 
                    width: '100%', padding: '0.6rem', backgroundColor: '#f1f1f1', 
                    border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', 
                    marginBottom: '1rem', color: '#333', fontWeight: 'bold' 
                  }}
                >
                  Mark as Read 👀
                </button>
              )}

              {msg.status === 'replied' ? (
                <div style={{ backgroundColor: '#e9fbee', padding: '1rem', borderRadius: '6px', border: '1px solid #cce8d6' }}>
                  <p style={{ fontSize: '0.8rem', color: '#279442', fontWeight: 'bold', marginBottom: '0.3rem' }}>Your Reply:</p>
                  <p style={{ fontSize: '0.9rem', color: '#333' }}>{msg.replyMessage}</p>
                </div>
              ) : (
                <div style={{ marginTop: '1rem' }}>
                  <textarea 
                    placeholder="Type your reply here..." 
                    value={replyText[msg._id] || ''}
                    onChange={(e) => setReplyText({...replyText, [msg._id]: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '6px', border: '1px solid #ddd', minHeight: '80px', marginBottom: '0.5rem', boxSizing: 'border-box' }}
                  />
                  <button 
                    onClick={() => sendReply(msg._id, msg.email)}
                    style={{ width: '100%', padding: '0.8rem', backgroundColor: '#007aff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    Send Reply ✉️
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}