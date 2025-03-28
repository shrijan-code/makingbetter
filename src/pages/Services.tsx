
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Car, Home as HomeIcon, User, Search, Star, ArrowRight, Clock, PenTool, Briefcase } from "lucide-react";

// Service types
type ServiceCategory = "concierge" | "home-luxury" | "professional" | "all";

// Premium services for wealthy clients
const services = [
  {
    id: 1,
    name: "Personal Chauffeur",
    category: "concierge",
    description: "Dedicated driver service with luxury vehicles for all your transportation needs",
    price: 120.00,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Priority Errand Runner",
    category: "concierge",
    description: "Skip the lines with our VIP errand service - groceries, pharmacy, dry cleaning and more",
    price: 85.00,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Event Concierge",
    category: "concierge",
    description: "Access to exclusive events, sold-out tickets, and VIP reservations through our insider connections",
    price: 150.00,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Luxury Home Cleaning",
    category: "home-luxury",
    description: "White-glove cleaning service with premium eco-friendly products and attention to detail",
    price: 180.00,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Private Chef Experience",
    category: "home-luxury",
    description: "Personalized gourmet meals prepared in your home by experienced chefs using premium ingredients",
    price: 250.00,
    rating: 5.0,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Smart Home Setup & Maintenance",
    category: "home-luxury",
    description: "Complete smart home installation, configuration and troubleshooting by certified technicians",
    price: 200.00,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Executive Virtual Assistant",
    category: "professional",
    description: "Dedicated assistant for emails, scheduling, travel arrangements and administrative tasks",
    price: 75.00,
    rating: 4.7,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Private Fitness Training",
    category: "professional",
    description: "Customized fitness sessions with certified trainers in the comfort of your home",
    price: 120.00,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Personal Stylist & Shopper",
    category: "professional",
    description: "Wardrobe consultation, styling, and exclusive shopping assistance by fashion professionals",
    price: 180.00,
    rating: 4.9,
    image: "/placeholder.svg",
  },
];

const Services = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);

  // Parse URL parameters to set initial tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    
    if (category && ["concierge", "home-luxury", "professional"].includes(category)) {
      setActiveCategory(category as ServiceCategory);
    } else {
      setActiveCategory("all");
    }
  }, [location.search]);

  // Filter services based on category and search query
  useEffect(() => {
    let result = services;
    
    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter(service => service.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        service => 
          service.name.toLowerCase().includes(query) || 
          service.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredServices(result);
  }, [activeCategory, searchQuery]);

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Premium Services</h1>
        <p className="text-muted-foreground max-w-3xl">
          Discover our exclusive selection of high-quality services designed to save you time and enhance your lifestyle.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as ServiceCategory)}>
        <TabsList className="mb-8">
          <TabsTrigger value="all" className="flex gap-2">
            All Services
          </TabsTrigger>
          <TabsTrigger value="concierge" className="flex gap-2">
            <Clock className="h-4 w-4" />
            Concierge Services
          </TabsTrigger>
          <TabsTrigger value="home-luxury" className="flex gap-2">
            <HomeIcon className="h-4 w-4" />
            Home Luxury
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex gap-2">
            <Briefcase className="h-4 w-4" />
            Professional Services
          </TabsTrigger>
        </TabsList>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground mb-4">No services found matching your criteria.</p>
              <Button onClick={() => {setSearchQuery(""); setActiveCategory("all");}}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

interface ServiceCardProps {
  service: {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    rating: number;
    image: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-background/90 text-foreground rounded flex items-center">
          <Star className="h-3 w-3 fill-primary text-primary mr-1" />
          <span className="text-sm font-medium">{service.rating}</span>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-muted-foreground mb-4">{service.description}</p>
        <p className="text-lg font-bold">${service.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 flex justify-between">
        <Button variant="outline" asChild>
          <Link to={`/providers?service=${service.id}`}>View Providers</Link>
        </Button>
        <Button asChild>
          <Link to={`/booking?service=${service.id}`}>
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Services;
