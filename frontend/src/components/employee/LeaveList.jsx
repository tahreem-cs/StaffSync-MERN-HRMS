import React, { useState, useEffect } from 'react';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch leave history when the component loads
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem('token');

        // REPLACE with your backend server URL for leaves history
        const response = await fetch('http://localhost:5000/api/leaves/my-leaves', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch leave history.');
        }

        setLeaves(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  // Helper function to color-code status badges
  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { backgroundColor: '#d1fae5', color: '#065f46' };
      case 'rejected':
        return { backgroundColor: '#fee2e2', color: '#dc2626' };
      default:
        return { backgroundColor: '#fef3c7', color: '#92400e' }; // Pending
    }
  };

  if (loading) return <div style={styles.center}>Loading leave history...</div>;
  if (error) return <div style={styles.errorAlert}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Leave Applications & History</h2>
      <p>Track the status of your submitted leave applications.</p>

      {leaves.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No leave applications submitted yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>End Date</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id || leave.id}>
                <td style={styles.td}>{leave.leaveType}</td>
                <td style={styles.td}>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td style={styles.td}>{new Date(leave.endDate).toLocaleDateString()}</td>
                <td style={styles.td}>{leave.reason}</td>
                <td style={styles.td}>
                  <span style={{ ...styles.badge, ...getStatusBadgeStyle(leave.status) }}>
                    {leave.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Basic inline styling
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
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
  badge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  errorAlert: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '10px',
    borderRadius: '5px',
    margin: '20px',
  },
};

export default LeaveList;