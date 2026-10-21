import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 1. Fetch attendance history when component loads
  const fetchAttendance = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/attendance/my-history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch attendance records.');
    }

    setAttendanceRecords(Array.isArray(data) ? data : data.attendance || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAttendance();
  }, []);

  // 2. Handle Check-in / Check-out action
  const handlePunch = async (actionType) => {
  setMessage('');
  setError('');

  try {
    const token = localStorage.getItem('token');
    // Align endpoint path without hyphens
    const endpoint = actionType === 'check-in' ? 'check-in' : 'check-out';

    const response = await fetch(`http://localhost:5000/api/attendance/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to record attendance.');
    }

    setMessage(`Successfully recorded ${actionType}!`);
    fetchAttendance(); // Refresh list after punch
  } catch (err) {
    setError(err.message);
  }
};
  if (loading) return <div style={styles.center}>Loading attendance records...</div>;

  return (
    <div style={styles.container}>
      <h2>Attendance Management</h2>
      <p>Check in for the day and view your past attendance history.</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      <div style={styles.buttonGroup}>
        <button onClick={() => handlePunch('check-in')} style={styles.checkInButton}>
          Check In
        </button>
        <button onClick={() => handlePunch('check-out')} style={styles.checkOutButton}>
          Check Out
        </button>
      </div>

      <h3>History</h3>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Check In</th>
              <th style={styles.th}>Check Out</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id || record.id}>
                <td style={styles.td}>{new Date(record.date).toLocaleDateString()}</td>
                <td style={styles.td}>{record.checkIn ? new Date(record.checkIn).toLocaleTimeString() : '-'}</td>
                <td style={styles.td}>{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : '-'}</td>
                <td style={styles.td}>{record.status || 'Present'}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    margin: '20px 0',
  },
  checkInButton: {
    padding: '10px 20px',
    backgroundColor: '#6B7A59',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  checkOutButton: {
    padding: '10px 20px',
    backgroundColor: '#9E5A47',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#f3f4f6',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
  },
  successAlert: {
    backgroundColor: '#EBF0E5',
    color: '#435233',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #C8D6BC',
    marginBottom: '16px',
  },
  errorAlert: {
    backgroundColor: '#FAF0EE',
    color: '#7D3728',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #E3C3BC',
    marginBottom: '16px',
  },
};

export default Attendance;