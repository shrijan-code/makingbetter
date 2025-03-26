
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Briefcase, Clock, UserCheck, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Sample data - in a real app, this would come from your Supabase database
const mockProviders = [
  { id: 'p1', name: 'John Smith', service: 'Plumbing', rating: 4.8 },
  { id: 'p2', name: 'Alice Johnson', service: 'House Cleaning', rating: 4.9 },
  { id: 'p3', name: 'Robert Davis', service: 'Electrician', rating: 4.7 },
];

const mockBookings = [
  { id: 'b1', service: 'House Cleaning', provider: 'Alice Johnson', date: '2023-12-05', status: 'Upcoming' },
  { id: 'b2', service: 'Plumbing', provider: 'John Smith', date: '2023-12-10', status: 'Confirmed' },
];

const mockServices = [
  { id: 's1', title: 'Basic Plumbing', price: 75, bookings: 12 },
  { id: 's2', title: 'Advanced Plumbing', price: 120, bookings: 5 },
  { id: 's3', title: 'Emergency Plumbing', price: 200, bookings: 3 },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const isProvider = user?.role === 'provider';
  
  const [stats, setStats] = useState({
    bookings: 0,
    messages: 0,
    earnings: 0,
    reviews: 0
  });
  
  useEffect(() => {
    // Simulate fetching dashboard data
    // In a real app, you'd fetch this from Supabase
    const fetchData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStats({
        bookings: Math.floor(Math.random() * 20),
        messages: Math.floor(Math.random() * 50),
        earnings: Math.floor(Math.random() * 5000),
        reviews: Math.floor(Math.random() * 40),
      });
    };
    
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex flex-row items-center pt-6">
            <Calendar className="h-10 w-10 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold">{stats.bookings}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center pt-6">
            <MessageSquare className="h-10 w-10 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium">Unread Messages</p>
              <p className="text-3xl font-bold">{stats.messages}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center pt-6">
            <DollarSign className="h-10 w-10 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium">{isProvider ? 'Earnings' : 'Spent'}</p>
              <p className="text-3xl font-bold">${stats.earnings}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center pt-6">
            <UserCheck className="h-10 w-10 text-primary mr-4" />
            <div>
              <p className="text-sm font-medium">Reviews</p>
              <p className="text-3xl font-bold">{stats.reviews}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      {isProvider ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Services */}
          <Card>
            <CardHeader>
              <CardTitle>My Services</CardTitle>
              <CardDescription>Services you're currently offering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockServices.map(service => (
                <div key={service.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">${service.price} • {service.bookings} bookings</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/edit-service/${service.id}`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/create-service">Add New Service</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{booking.service}</h4>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="inline h-4 w-4 mr-1" /> {booking.date} • {booking.status}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/messages`}>Message Client</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link to="/bookings">View All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{booking.service}</h4>
                    <p className="text-sm text-muted-foreground">
                      <Briefcase className="inline h-4 w-4 mr-1" /> {booking.provider}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="inline h-4 w-4 mr-1" /> {booking.date} • {booking.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/messages`}>Message</Link>
                    </Button>
                    {booking.status === 'Completed' && (
                      <Button size="sm" asChild>
                        <Link to={`/payment/${booking.id}`}>Pay</Link>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link to="/bookings">View All Bookings</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Recommended Providers */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Providers</CardTitle>
              <CardDescription>Top-rated service providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockProviders.map(provider => (
                <div key={provider.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <h4 className="font-medium">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {provider.service} • ⭐ {provider.rating}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/booking?provider=${provider.id}`}>Book Now</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link to="/providers">View All Providers</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
