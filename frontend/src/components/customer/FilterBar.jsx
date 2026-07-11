export default function FilterBar({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div style={filterBarStyle}>
        <h3 style={{ marginBottom: '1rem', color: '#333' }}>Filter by Category</h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>

            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}

                    style={selectedCategory === category ? activeBtnStyle : btnStyle}
                >
                    {category}
                </button>
            ))}
        </div>
    </div>
  );
}



const filterContainerStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  marginBottom: '2rem' // Shop page එකේ කාඩ් වලට උඩින් ඉඩ තියන්න
};
const btnStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #ddd',
  borderRadius: '20px',
  backgroundColor: 'white',
  color: '#555',
  cursor: 'pointer',
  transition: 'all 0.2s'
};
const activeBtnStyle = {
  ...btnStyle, // Spread operator (...): පරණ btnStyle එකේ තියෙන ඔක්කොම දේවල් අරන් අලුත් පාටවල් දානවා
  backgroundColor: '#ff6b6b',
  color: 'white',
  border: '1px solid #ff6b6b'
};

const filterBarStyle = {
  backgroundColor: 'white',
  padding: '1.5rem',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  marginBottom: '2rem'
};