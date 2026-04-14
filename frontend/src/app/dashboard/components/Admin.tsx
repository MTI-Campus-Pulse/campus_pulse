// Admin.tsx
import React from 'react';
import { ReportsViewer } from './ManagerDashboard'; // استورد المكون

export default function Admin() {
  
  return <div className='mt-25'>
    <ReportsViewer userRole="admin" />;
    </div>
  
}