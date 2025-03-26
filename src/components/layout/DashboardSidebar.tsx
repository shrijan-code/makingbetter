
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, MessageSquare, Calendar, 
  Home, LogOut, Settings, Briefcase, PlusCircle, CreditCard 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isProvider = user?.role === 'provider';

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/messages", label: "Messages", icon: MessageSquare },
    ...(isProvider 
      ? [
          { to: "/create-service", label: "Add Service", icon: PlusCircle },
          { to: "/my-services", label: "My Services", icon: Briefcase },
        ] 
      : [
          { to: "/bookings", label: "My Bookings", icon: Calendar },
        ]
    ),
  ];

  return (
    <div className="w-64 border-r h-screen">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-10">
          <span className="bg-primary text-primary-foreground p-1 rounded-md">
            <Briefcase className="h-6 w-6" />
          </span>
          <span>MakingBetter</span>
        </Link>
        
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                location.pathname === link.to 
                  ? "bg-accent text-accent-foreground" 
                  : "hover:bg-accent/50"
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-0 right-0 px-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3" 
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
