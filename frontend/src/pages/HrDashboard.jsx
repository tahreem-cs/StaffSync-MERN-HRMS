import React, { useState } from 'react';
import EmployeeCRUD from '../components/hr/EmployeeCRUD';
import AnnouncementsManager from '../components/hr/AnnouncementsManager';
import LeaveApplications from '../components/hr/LeaveApplications';

const HrDashboard = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>HR Management Dashboard</h1>
      </header>

      {/* Navigation Tabs */}
      <nav style={styles.nav}>
        <button
          onClick={() => setActiveTab('employees')}
          style={activeTab === 'employees' ? styles.activeTab : styles.tab}
        >
          Manage Employees
        </button>
        <button
          onClick={() => setActiveTab('announcements')}
          style={activeTab === 'announcements' ? styles.activeTab : styles.tab}
        >
          Manage Announcements
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          style={activeTab === 'leaves' ? styles.activeTab : styles.tab}
        >
          Leave Applications
        </button>
      </nav>

      {/* Tab Content */}
      <main style={styles.content}>
        {activeTab === 'employees' && <EmployeeCRUD />}
        {activeTab === 'announcements' && <AnnouncementsManager />}
        {activeTab === 'leaves' && <LeaveApplications />}
      </main>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
  activeTab: {
    backgroundColor: '#7C5C43', // Warm Espresso Brown
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(124, 92, 67, 0.2)',
  },
  content: {
    marginTop: '10px',
  },
};

export default HrDashboard;