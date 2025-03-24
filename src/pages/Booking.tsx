import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEmailSubmission } from "@/hooks/useEmailSubmission";

const services = [
  { id: 1, name: "Premium Car Wash", category: "car-wash", price: 49.99 },
  { id: 2, name: "Quick Car Wash", category: "car-wash", price: 19.99 },
  { id: 3, name: "Interior Detailing", category: "car-wash", price: 89.99 },
  { id: 4, name: "Standard Home Cleaning", category: "home-cleaning", price: 79.99 },
  { id: 5, name: "Deep Home Cleaning", category: "home-cleaning", price: 129.99 },
  { id: 6, name: "Window Cleaning", category: "home-cleaning", price: 59.99 },
  { id: 7, name: "Haircut & Styling", category: "personal-care", price: 39.99 },
  { id: 8, name: "Massage Therapy", category: "personal-care", price: 69.99 },
  { id: 9, name: "Manicure & Pedicure", category: "personal-care", price: 49.99 },
];

const providers = [
  {
    id: 1,
    name: "Jane Smith",
    avatar: "/placeholder.svg",
    services: [1, 2, 3],
    rating: 4.9,
  },
  {
    id: 2,
    name: "Michael Johnson",
    avatar: "/placeholder.svg",
    services: [1, 2],
    rating: 4.7,
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    services: [4, 5, 6],
    rating: 4.8,
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "/placeholder.svg",
    services: [4, 5],
    rating: 4.6,
  },
  {
    id: 5,
    name: "Linda Rodriguez",
    avatar: "/placeholder.svg",
    services: [7, 8, 9],
    rating: 4.9,
  },
  {
    id: 6,
    name: "Robert Davis",
    avatar: "/placeholder.svg",
    services: [8, 9],
    rating: 4.8,
  },
];

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const { submitBookingEmail, isSubmitting } = useEmailSubmission();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get("service");
    const providerId = params.get("provider");
    
    if (serviceId && !isNaN(parseInt(serviceId))) {
      setSelectedService(parseInt(serviceId));
      setCurrentStep(serviceId ? 2 : 1);
    }
    
    if (providerId && !isNaN(parseInt(providerId))) {
      setSelectedProvider(parseInt(providerId));
      setCurrentStep(providerId ? 3 : currentStep);
    }
  }, [location.search]);

  const filteredProviders = selectedService 
    ? providers.filter(provider => provider.services.includes(selectedService))
    : providers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const service = services.find(s => s.id === selectedService);
    const provider = providers.find(p => p.id === selectedProvider);
    
    if (!service || !provider || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please ensure all booking details are complete.",
        variant: "destructive"
      });
      return;
    }
    
    const emailData = {
      service: service.name,
      servicePrice: service.price,
      provider: provider.name,
      date: format(selectedDate, "MMMM d, yyyy"),
      time: selectedTime,
      customerName: contactInfo.name,
      customerEmail: contactInfo.email,
      customerPhone: contactInfo.phone,
      customerAddress: contactInfo.address,
      customerNotes: contactInfo.notes || "None provided"
    };
    
    try {
      await submitBookingEmail(emailData);
      
      toast({
        title: "Booking Confirmed!",
        description: `Your appointment has been scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`,
      });
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast({
        title: "Booking Error",
        description: "There was a problem submitting your booking. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container py-8 md:py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Book a Service</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow the steps below to schedule your service appointment with one of our professional providers.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between max-w-lg mx-auto relative">
          <div className="absolute top-1/2 h-0.5 w-full bg-muted -z-10"></div>
          {[1, 2, 3, 4].map((step) => (
            <div 
              key={step}
              className={`flex items-center justify-center h-10 w-10 rounded-full border-2 ${
                currentStep >= step 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-background text-muted-foreground border-muted"
              }`}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
          ))}
        </div>
        <div className="flex justify-between max-w-lg mx-auto mt-2">
          <span className="text-xs text-center w-10">Service</span>
          <span className="text-xs text-center w-10">Provider</span>
          <span className="text-xs text-center w-10">Schedule</span>
          <span className="text-xs text-center w-10">Confirm</span>
        </div>
      </div>

      <div className="mb-8">
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Select a Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => (
                <Card 
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService === service.id ? "border-primary ring-1 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>
                      ${service.price.toFixed(2)}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    {selectedService === service.id && (
                      <span className="text-primary text-sm flex items-center gap-1">
                        <Check className="h-4 w-4" /> Selected
                      </span>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                disabled={!selectedService}
                onClick={() => setCurrentStep(2)}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Select a Provider</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1" 
                onClick={() => setCurrentStep(1)}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProviders.map((provider) => (
                <Card 
                  key={provider.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProvider === provider.id ? "border-primary ring-1 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedProvider(provider.id)}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={provider.avatar} 
                        alt={provider.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{provider.name}</h3>
                      <p className="text-sm text-muted-foreground">Rating: {provider.rating}/5</p>
                    </div>
                    {selectedProvider === provider.id && (
                      <span className="ml-auto text-primary">
                        <Check className="h-5 w-5" />
                      </span>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                disabled={!selectedProvider}
                onClick={() => setCurrentStep(3)}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Select Date & Time</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1" 
                onClick={() => setCurrentStep(2)}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6
                    }
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Select Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button 
                disabled={!selectedDate || !selectedTime}
                onClick={() => setCurrentStep(4)}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Review & Confirm</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1" 
                onClick={() => setCurrentStep(3)}
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span className="font-medium">{services.find(s => s.id === selectedService)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Provider:</span>
                    <span className="font-medium">{providers.find(p => p.id === selectedProvider)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">{selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-medium">Price:</span>
                    <span className="font-bold">${services.find(s => s.id === selectedService)?.price.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter your full name"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Enter your email address"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      placeholder="Enter your phone number"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Service Address</Label>
                    <Input 
                      id="address" 
                      placeholder="Enter the service location"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Notes</Label>
                    <Textarea 
                      id="notes" 
                      placeholder="Any special requirements or notes"
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({...contactInfo, notes: e.target.value})}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Confirm Booking</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Booking;
