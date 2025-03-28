import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MessageSquare, Briefcase, Clock, UserCheck, DollarSign, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

// Define types for our data
interface Service {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  bookings_count?: number;
}

interface Booking {
  id: string;
  service: {
    title: string;
  } | null;
  provider?: {
    name: string;
  } | null;
  client?: {
    name: string;
  } | null;
  date: string;
  status: string;
}

interface Provider {
  id: string;
  name: string;
  services: {
    title: string;
  }[] | null;
  rating?: string;
}

const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const isProvider = profile?.role === 'provider';
  
  const [stats, setStats] = useState({
    bookings: 0,
    messages: 0,
    earnings: 0,
    reviews: 0
  });
  
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!user) return;
        
        // Fetch stats (for now we'll use mock data, but this could be a real API call)
        setStats({
          bookings: Math.floor(Math.random() * 20),
          messages: Math.floor(Math.random() * 50),
          earnings: Math.floor(Math.random() * 5000),
          reviews: Math.floor(Math.random() * 40),
        });
        
        // Fetch services if user is a provider
        if (isProvider) {
          const { data: servicesData, error: servicesError } = await supabase
            .from('services')
            .select('*')
            .eq('provider_id', user.id);
            
          if (servicesError) throw servicesError;
          setServices(servicesData || []);
        }
        
        // Fetch bookings for both providers and clients
        if (isProvider) {
          // For providers, fetch bookings with client info
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              id,
              date,
              status,
              service:service_id(title),
              client:client_id(name)
            `)
            .eq('provider_id', user.id);
            
          if (bookingsError) throw bookingsError;
          
          // Transform data to match Booking interface
          const formattedBookings: Booking[] = (bookingsData || []).map(booking => ({
            id: booking.id,
            date: booking.date,
            status: booking.status,
            service: booking.service,
            client: booking.client
          }));
          
          setBookings(formattedBookings);
        } else {
          // For clients, fetch bookings with provider info
          const { data: bookingsData, error: bookingsError } = await supabase
            .from('bookings')
            .select(`
              id,
              date,
              status,
              service:service_id(title),
              provider:provider_id(name)
            `)
            .eq('client_id', user.id);
            
          if (bookingsError) throw bookingsError;
          
          // Transform data to match Booking interface
          const formattedBookings: Booking[] = (bookingsData || []).map(booking => ({
            id: booking.id,
            date: booking.date,
            status: booking.status,
            service: booking.service,
            provider: booking.provider
          }));
          
          setBookings(formattedBookings);
        }
        
        // If client, fetch recommended providers
        if (!isProvider) {
          // For now, just fetch providers without trying to join services
          const { data: providersData, error: providersError } = await supabase
            .from('profiles')
            .select('id, name')
            .eq('role', 'provider')
            .limit(3);
            
          if (providersError) throw providersError;
          
          // Add mock ratings and empty services array for now
          const providersWithRatings = providersData?.map(provider => ({
            ...provider,
            rating: (Math.random() * 2 + 3).toFixed(1),
            services: [] // Empty array instead of trying to join
          })) || [];
          
          setProviders(providersWithRatings);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user, isProvider]);

  // Helper function to format service data for display
  const formatServiceData = (service: Service) => ({
    id: service.id,
    title: service.title,
    price: service.price,
    bookings: service.bookings_count || 0
  });

  // Show loading state if data is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

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
              {services.length > 0 ? (
                services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-sm text-muted-foreground">${service.price} • {service.bookings_count || 0} bookings</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/edit-service/${service.id}`}>Edit</Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>You haven't added any services yet.</p>
                </div>
              )}
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
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{booking.service?.title || 'Untitled Service'}</h4>
                      <p className="text-sm text-muted-foreground">
                        <Clock className="inline h-4 w-4 mr-1" /> {booking.date} • {booking.status}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/messages`}>Message Client</Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No upcoming bookings.</p>
                </div>
              )}
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
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{booking.service?.title || 'Untitled Service'}</h4>
                      <p className="text-sm text-muted-foreground">
                        <Briefcase className="inline h-4 w-4 mr-1" /> {booking.provider?.name || 'Unknown Provider'}
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
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No upcoming bookings.</p>
                </div>
              )}
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
              {providers.length > 0 ? (
                providers.map((provider) => (
                  <div key={provider.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="font-medium">{provider.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {provider.services && provider.services.length > 0 
                          ? provider.services[0].title 
                          : 'Various Services'} • ⭐ {provider.rating}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/booking?provider=${provider.id}`}>Book Now</Link>
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No providers available at the moment.</p>
                </div>
              )}
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
