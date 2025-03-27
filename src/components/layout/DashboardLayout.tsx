
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardSidebar from './DashboardSidebar';
import { Loader2 } from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Welcome, {profile?.name}</h1>
          <p className="text-muted-foreground">
            {profile?.role === 'provider' ? 'Service Provider Dashboard' : 'Client Dashboard'}
          </p>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
