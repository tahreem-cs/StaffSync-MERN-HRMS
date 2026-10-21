import React, { useState, useEffect } from 'react';

const EmployeeCRUD = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Form state for creating or editing an employee
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    designation: '',
    role: 'Employee',
  });

  const [editingId, setEditingId] = useState(null);

  // 1. Fetch all employees from the backend
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/employees', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch employees');

      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Create or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const token = localStorage.getItem('token');
    const url = editingId
      ? `http://localhost:5000/api/employees/${editingId}`
      : 'http://localhost:5000/api/employees';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Action failed');

      setMessage(editingId ? 'Employee updated successfully!' : 'Employee added successfully!');
      setFormData({ name: '', email: '', department: '', designation: '', role: 'Employee' });
      setEditingId(null);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Set form fields for editing
  const handleEdit = (employee) => {
    setEditingId(employee._id || employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department || '',
      designation: employee.designation || '',
      role: employee.role || 'Employee',
    });
  };

  // 4. Delete Employee
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete employee');

      setMessage('Employee deleted successfully!');
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div style={styles.center}>Loading employee records...</div>;

  return (
    <div style={styles.container}>
      <h2>Employee Management (CRUD)</h2>
      <p>Create, view, update, or delete employee data.</p>

      {message && <div style={styles.successAlert}>{message}</div>}
      {error && <div style={styles.errorAlert}>{error}</div>}

      {/* Form Section */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <div style={styles.formGrid}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            style={styles.input}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            style={styles.input}
          />
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            style={styles.input}
          />
           <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation (e.g. Software Engineer)"
            required
            style={styles.input}
          />
          <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
            <option value="Employee">Employee</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div style={styles.btnGroup}>
          <button type="submit" style={styles.submitBtn}>
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', email: '', department: '', role: 'Employee' });
              }}
              style={styles.cancelBtn}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Table Section */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Department</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id || emp.id}>
              <td style={styles.td}>{emp.name}</td>
              <td style={styles.td}>{emp.email}</td>
              <td style={styles.td}>{emp.department || 'N/A'}</td>
              <td style={styles.td}>{emp.role}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(emp)} style={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(emp._id || emp.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left' },
  center: { textAlign: 'center', padding: '40px' },
  form: { backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(92,64,51,0.08)',borderBottom: '1px solid #E8E2D9', marginBottom: '24px' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' },
  input: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #D6CEC3',backgroundColor:'#FAFAFA',color: '#2C221E', fontSize: '14px',outline: 'none', },
  btnGroup: { marginTop: '18px', display: 'flex', gap: '12px' },
  submitBtn: { padding: '10px 20px', backgroundColor: '#7C5C43', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  cancelBtn: { padding: '10px 20px', backgroundColor: '#A09382', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFF', boxShadow: '0 4px 12px rgba(92,64,51,0.08)', borderRadius: '12px', overflow: 'hidden' },
  th: { backgroundColor: '#EFEBE4', padding: '14px', color: '#4A3B32',fontWeight: '600', borderBottom: '1px solid #E8E2D9', textAlign: 'left' },
  td: { padding: '14px', borderBottom: '1px solid #F0EAE1',color: '#3A2E2B' },
  editBtn: { padding: '6px 14px', backgroundColor: '#A07855', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' },
  deleteBtn: { padding: '6px 14px', backgroundColor: '#9E5A47', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  successAlert: { backgroundColor: '#EBF0E5', color: '#435233', padding: '12px 16px', borderRadius: '8px',border: '1px solid #C8D6BC', marginBottom: '16px' },
  errorAlert: { backgroundColor: '#FAF0EE', color: '#7D3728', padding: '12px 16px', borderRadius: '8px',border: '1px solid #E3C3BC', marginBottom: '16px' },
};

export default EmployeeCRUD;