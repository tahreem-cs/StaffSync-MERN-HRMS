import React, { useState, useEffect } from 'react';

const TrainingManagement = () => {
  const [trainings, setTrainings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Form state to create and assign training
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
  });

  // Fetch training programs and employee list
  // Fetch training programs and employee list
const fetchData = async () => {
  try {
    const token = localStorage.getItem('token');
    setLoading(true);

    // 1. Fetch existing training programs
    const trainingRes = await fetch('http://localhost:5000/api/training', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const trainingData = await trainingRes.json();
    if (trainingRes.ok) {
      setTrainings(Array.isArray(trainingData) ? trainingData : trainingData.data || []);
    }

    // 2. Fetch employees for dropdown selection
    const employeeRes = await fetch('http://localhost:5000/api/employees', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const employeeData = await employeeRes.json();
    if (employeeRes.ok) {
      setEmployees(Array.isArray(employeeData) ? employeeData : employeeData.employees || employeeData.data || []);
    }
  } catch (err) {
    setError(err.message || 'Failed to fetch data');
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Assign training
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to assign training.');

      setMessage('Training assigned successfully!');
      setFormData({ title: '', description: '', assignedTo: '', dueDate: '' });
      fetchData(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={styles.center}>Loading training management...</div>;

  return (
    <div style={styles.container}>
      <h2>Training Management</h2>
      <p>Plan and assign training programs to your team members.</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      {/* Plan & Assign Training Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Plan & Assign Training</h3>
        <div style={styles.inputGroup}>
          <label>Training Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., React & Redux Mastery"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Assign To Employee</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select Employee</option>
            {Array.isArray(employees) && employees.length > 0 && employees.map((emp) => (
              <option key={emp._id || emp.id} value={emp._id || emp.id}>
                {emp.name||emp.fullName||emp.email||'Unnamed Employee'} 
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Details about the training curriculum..."
            rows="3"
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Assign Training
        </button>
      </form>

      {/* Training Programs List */}
      <h3>Assigned Training Programs</h3>
      {trainings.length === 0 ? (
        <p>No training programs assigned yet.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Assigned To</th>
              <th style={styles.th}>Due Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((item) => (
              <tr key={item._id || item.id}>
                <td style={styles.td}>{item.title}</td>
                <td style={styles.td}>{item.assignedTo?.name || 'Employee'}</td>
                <td style={styles.td}>{new Date(item.dueDate).toLocaleDateString()}</td>
                <td style={styles.td}>{item.status || 'In Progress'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '900px', margin: '0 auto', textAlign: 'left' },
  center: { textAlign: 'center', padding: '40px' },
  form: { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' },
  inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column' },
  input: { padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px' },
  button: { padding: '10px 20px', backgroundColor: '#4A3B32', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' },
  th: { backgroundColor: '#f3f4f6', padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'left' },
  td: { padding: '12px', borderBottom: '1px solid #e5e7eb' },
  successAlert: { backgroundColor: '#d1fae5', color: '#065f46', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
  errorAlert: { backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '5px', marginBottom: '15px' },
};

export default TrainingManagement;