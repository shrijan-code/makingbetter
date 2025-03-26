
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            {user?.role === 'provider' ? 'Service Provider Dashboard' : 'Client Dashboard'}
          </p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
