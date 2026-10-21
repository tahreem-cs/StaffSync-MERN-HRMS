import React, { useState } from 'react';
import TrainingManagement from '../components/manager/TrainingManagement';
import LeaveApplications from '../components/hr/LeaveApplications';

const ManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState('training');

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1>Manager Dashboard</h1>
      </header>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('training')}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: activeTab === 'training' ? '#7C5C43' : '#e5e7eb',
            color: activeTab === 'training' ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          Training Management
        </button>
        <button
          onClick={() => setActiveTab('leaves')}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: activeTab === 'leaves' ? '#7C5C43' : '#e5e7eb',
            color: activeTab === 'leaves' ? '#fff' : '#000',
            cursor: 'pointer',
          }}
        >
          Team Leave Approvals
        </button>
      </nav>

      <main>
        {activeTab === 'training' && <TrainingManagement />}
        {activeTab === 'leaves' && <LeaveApplications />}
      </main>
    </div>
  );
};

export default ManagerDashboard;