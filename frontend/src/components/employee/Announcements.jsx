import React, { useState, useEffect } from 'react';

const Announcements = () => {
  // 1. State to hold the list of announcements and loading/error states
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Fetch announcements from your backend when the component loads
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const token = localStorage.getItem('token');

        // REPLACE with your backend server URL for announcements
        const response = await fetch('http://localhost:5000/api/announcements', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Send token for authentication
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch announcements.');
        }

        setAnnouncements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <div style={styles.center}>Loading announcements...</div>;
  if (error) return <div style={styles.errorAlert}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Company Announcements</h2>
      <p>Stay up to date with the latest company news and updates.</p>

      {announcements.length === 0 ? (
        <p>No announcements available right now.</p>
      ) : (
        <div style={styles.list}>
          {announcements.map((item) => (
            <div key={item._id || item.id} style={styles.card}>
              <h3>{item.title}</h3>
              <p style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</p>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Basic inline styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
  },
  list: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  date: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '10px',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px',
    borderRadius: '5px',
    margin: '20px',
  },
};

export default Announcements;