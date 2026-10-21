import React, { useState } from 'react';
import Announcements from '../components/employee/Announcements';
import Attendance from '../components/employee/Attendance';
import LeaveApply from '../components/employee/LeaveApply';
import LeaveList from '../components/employee/LeaveList';

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('announcements');

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Employee Dashboard</h1>
      </header>

      {/* Tab Navigation */}
      <nav style={styles.nav}>
        <button 
          onClick={() => setActiveTab('announcements')} 
          style={activeTab === 'announcements' ? styles.activeTab : styles.tab}
        >
          Announcements
        </button>
        <button 
          onClick={() => setActiveTab('attendance')} 
          style={activeTab === 'attendance' ? styles.activeTab : styles.tab}
        >
          Attendance
        </button>
        <button 
          onClick={() => setActiveTab('apply-leave')} 
          style={activeTab === 'apply-leave' ? styles.activeTab : styles.tab}
        >
          Apply Leave
        </button>
        <button 
          onClick={() => setActiveTab('leave-history')} 
          style={activeTab === 'leave-history' ? styles.activeTab : styles.tab}
        >
          Leave History
        </button>
      </nav>

      {/* Render selected view */}
      <main style={styles.content}>
        {activeTab === 'announcements' && <Announcements />}
        {activeTab === 'attendance' && <Attendance />}
        {activeTab === 'apply-leave' && <LeaveApply />}
        {activeTab === 'leave-history' && <LeaveList />}
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
    padding: '10px 20px',
    border: '1px solid #7C5C43',
    borderRadius: '5px',
    backgroundColor: '#7C5C43',
    color: '#fff',
    cursor: 'pointer',
  },
  content: {
    marginTop: '10px',
  },
};

export default EmployeeDashboard;