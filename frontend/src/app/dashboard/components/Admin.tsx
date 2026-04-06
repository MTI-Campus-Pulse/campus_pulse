// Admin.tsx
import React from 'react';
import { ReportsViewer } from './ManagerDashboard'; // استورد المكون

export default function Admin() {
  return <ReportsViewer userRole="admin" />;
}