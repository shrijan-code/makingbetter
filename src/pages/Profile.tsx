
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { User, Bell, CreditCard, LogOut, Clock, MapPin, MessageSquare, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock user profile data
const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "(555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  avatar: "/placeholder.svg",
  member_since: "January 2023",
};

// Mock booking data
const bookings = [
  {
    id: 1,
    service: "Premium Car Wash",
    provider: "Jane Smith",
    date: "May 15, 2023",
    time: "10:00 AM",
    status: "completed",
    price: 49.99,
  },
  {
    id: 2,
    service: "Deep Home Cleaning",
    provider: "Sarah Williams",
    date: "June 2, 2023",
    time: "1:00 PM",
    status: "completed",
    price: 129.99,
  },
  {
    id: 3,
    service: "Massage Therapy",
    provider: "Robert Davis",
    date: "June 10, 2023",
    time: "3:00 PM",
    status: "cancelled",
    price: 69.99,
  },
  {
    id: 4,
    service: "Quick Car Wash",
    provider: "Michael Johnson",
    date: "July 5, 2023",
    time: "11:00 AM",
    status: "upcoming",
    price: 19.99,
  },
];

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: "Credit Card",
    last4: "4242",
    expiry: "05/25",
    default: true,
  },
  {
    id: 2,
    type: "Credit Card",
    last4: "1234",
    expiry: "09/24",
    default: false,
  },
];

const Profile = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleProfileSave = () => {
    // In a real app, you'd save to backend here
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditDialogOpen(false);
  };

  const handleCancelBooking = (bookingId: number) => {
    // In a real app, you'd cancel on backend here
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">My Profile</h1>
        <p className="text-muted-foreground max-w-3xl">
          Manage your profile, view your bookings, and update payment information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold">Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{userProfile.name}</h2>
              <p className="text-sm text-muted-foreground">Member since {userProfile.member_since}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{userProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{userProfile.address}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Update your personal information below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address" 
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleProfileSave}>Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="bookings">
            <TabsList className="mb-6">
              <TabsTrigger value="bookings" className="flex gap-2">
                <Calendar className="h-4 w-4" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.service}</TableCell>
                          <TableCell>{booking.provider}</TableCell>
                          <TableCell>
                            {booking.date} {booking.time}
                          </TableCell>
                          <TableCell>
                            <BookingStatus status={booking.status} />
                          </TableCell>
                          <TableCell>${booking.price.toFixed(2)}</TableCell>
                          <TableCell>
                            {booking.status === "upcoming" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Cancel
                              </Button>
                            )}
                            {booking.status === "completed" && (
                              <Button variant="outline" size="sm">Review</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button size="sm">Add Payment Method</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {method.type} ending in {method.last4}
                              {method.default && <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>}
                            </p>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          {!method.default && <Button variant="ghost" size="sm">Remove</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <NotificationSetting 
                      title="Booking Confirmations"
                      description="Receive notifications when your booking is confirmed"
                      defaultChecked={true}
                    />
                    <NotificationSetting 
                      title="Booking Reminders"
                      description="Receive reminders 24 hours before your appointment"
                      defaultChecked={true}
                    />
                    <NotificationSetting 
                      title="Provider Updates"
                      description="Receive notifications when a provider is on the way"
                      defaultChecked={true}
                    />
                    <NotificationSetting 
                      title="Special Offers"
                      description="Receive notifications about promotions and discounts"
                      defaultChecked={false}
                    />
                    <NotificationSetting 
                      title="Service Updates"
                      description="Receive notifications about new services and features"
                      defaultChecked={false}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Component for booking status badges
const BookingStatus = ({ status }: { status: string }) => {
  switch (status) {
    case "completed":
      return (
        <div className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-green-600 font-medium">Completed</span>
        </div>
      );
    case "upcoming":
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-blue-600 font-medium">Upcoming</span>
        </div>
      );
    case "cancelled":
      return (
        <div className="flex items-center gap-1">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-red-600 font-medium">Cancelled</span>
        </div>
      );
    default:
      return <span>{status}</span>;
  }
};

// Component for notification settings
interface NotificationSettingProps {
  title: string;
  description: string;
  defaultChecked: boolean;
}

const NotificationSetting = ({ title, description, defaultChecked }: NotificationSettingProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox"
            id={`notification-${title}`}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary"
          />
          <Label
            htmlFor={`notification-${title}`}
            className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {checked ? "On" : "Off"}
          </Label>
        </div>
      </div>
    </div>
  );
};

// Import these missing components
const Mail = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Phone = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default Profile;
