import React, { useState, useEffect } from 'react';

const AnnouncementsManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/announcements', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch announcements.');
      setAnnouncements(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Handle posting a new announcement
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to post announcement.');

      setMessage('Announcement posted successfully!');
      setFormData({ title: '', content: '' });
      fetchAnnouncements();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle deleting an announcement
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;

    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete announcement.');

      setMessage('Announcement deleted successfully!');
      fetchAnnouncements();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={styles.center}>Loading announcements...</div>;

  return (
    <div style={styles.container}>
      <h2>Announcements Manager</h2>
      <p>Post and manage company announcements.</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      {/* Post Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Create New Announcement</h3>
        <div style={styles.inputGroup}>
          <label>Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Announcement Title"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write announcement details here..."
            rows="3"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Post Announcement</button>
      </form>

      {/* List Section */}
      <h3>Existing Announcements</h3>
      {announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <div style={styles.list}>
          {announcements.map((item) => (
            <div key={item._id || item.id} style={styles.card}>
              <div>
                <h4>{item.title}</h4>
                <p style={styles.contentTxt}>{item.content}</p>
              </div>
              <button onClick={() => handleDelete(item._id || item.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'left' },
  center: { textAlign: 'center', padding: '40px' },
  form: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' },
  inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
  input: { padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px' },
  button: { padding: '10px 20px', backgroundColor: '#7C5C43', color: '#FFFFFF', border: 'none',fontWeight: '600', borderRadius: '8px', cursor: 'pointer',transition: 'background-color 0.2s ease' },
  list: { display: 'flex', flexDirection: 'column', gap: '10px' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  contentTxt: { marginTop: '5px', color: '#4b5563' },
  deleteBtn: { padding: '6px 12px', backgroundColor: '#9E5A47', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', height: 'fit-content' },
  successAlert: { backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
  errorAlert: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
};

export default AnnouncementsManager;