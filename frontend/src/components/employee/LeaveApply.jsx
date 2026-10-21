import React, { useState } from 'react';

const LeaveApply = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    leaveType: 'Casual',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update input values as the user types or selects options
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submitting the leave request to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // REPLACE with your backend server URL for leaves
      const response = await fetch('http://localhost:5000/api/leaves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit leave application.');
      }

      setMessage('Leave application submitted successfully!');
      setFormData({
        startDate: '',
        endDate: '',
        reason: '',
        leaveType: 'Casual',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Apply for Leave</h2>
      <p>Fill out the form below to submit your leave request for approval.</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Leave Type</label>
          <select 
            name="leaveType" 
            value={formData.leaveType} 
            onChange={handleChange} 
            style={styles.input}
          >
            <option value="Casual">Casual Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Annual">Annual Leave</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Start Date</label>
          <input 
            type="date" 
            name="startDate" 
            value={formData.startDate} 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label>End Date</label>
          <input 
            type="date" 
            name="endDate" 
            value={formData.endDate} 
            onChange={handleChange} 
            required 
            style={styles.input} 
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Reason</label>
          <textarea 
            name="reason" 
            value={formData.reason} 
            onChange={handleChange} 
            placeholder="Provide a reason for your leave..." 
            rows="4" 
            required 
            style={styles.input} 
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>
    </div>
  );
};

// Basic inline styling
const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'left',
  },
  form: {
    backgroundColor: '#fff',
    padding: '25px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginTop: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '10px',
  },
  successAlert: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
  },
};

export default LeaveApply;