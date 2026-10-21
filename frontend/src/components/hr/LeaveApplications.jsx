import React, { useState, useEffect } from 'react';

const LeaveApplications = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // 1. Fetch all leave applications for HR review
  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/leaves/all', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch leave applications.');

      setLeaves(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 2. Handle approving or rejecting a leave request
  const handleAction = async (id, status) => {
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/leaves/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }) // 'Approved' or 'Rejected'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Failed to ${status.toLowerCase()} leave.`);

      setMessage(`Leave request successfully ${status.toLowerCase()}!`);
      fetchLeaves(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={styles.center}>Loading leave requests...</div>;

  return (
    <div style={styles.container}>
      <h2>HR Leave Applications Management</h2>
      <p>View, approve, or reject leave requests[cite: 3].</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      {leaves.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No pending leave applications found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Employee</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Dates</th>
              <th style={styles.th}>Reason</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id || leave.id}>
                <td style={styles.td}>{leave.user?.name || leave.employeeName || 'Employee'}</td>
                <td style={styles.td}>{leave.leaveType}</td>
                <td style={styles.td}>
                  {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td style={styles.td}>{leave.reason}</td>
                <td style={styles.td}>
                  <span style={styles.statusBadge(leave.status)}>{leave.status || 'Pending'}</span>
                </td>
                <td style={styles.td}>
                  {(!leave.status || leave.status === 'Pending') ? (
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button 
                        onClick={() => handleAction(leave._id || leave.id, 'Approved')} 
                        style={styles.approveBtn}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(leave._id || leave.id, 'Rejected')} 
                        style={styles.rejectBtn}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span>Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' },
  center: { textAlign: 'center', padding: '40px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' },
  th: { backgroundColor: '#f3f4f6', padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'left' },
  td: { padding: '12px', borderBottom: '1px solid #e5e7eb', verticalAlign: 'middle' },
  approveBtn: { padding: '6px 12px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  rejectBtn: { padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  statusBadge: (status) => ({
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    backgroundColor: status === 'Approved' ? '#d1fae5' : status === 'Rejected' ? '#fee2e2' : '#fef3c7',
    color: status === 'Approved' ? '#065f46' : status === 'Rejected' ? '#dc2626' : '#92400e',
  }),
  successAlert: { backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
  errorAlert: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
};

export default LeaveApplications;