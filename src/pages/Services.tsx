
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Car, Home as HomeIcon, User, Search, Star, ArrowRight } from "lucide-react";

// Service types
type ServiceCategory = "car-wash" | "home-cleaning" | "personal-care" | "all";

// Mock data for services
const services = [
  {
    id: 1,
    name: "Premium Car Wash",
    category: "car-wash",
    description: "Complete interior and exterior cleaning with premium products",
    price: 49.99,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Quick Car Wash",
    category: "car-wash",
    description: "Fast exterior wash and wipe down",
    price: 19.99,
    rating: 4.5,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Interior Detailing",
    category: "car-wash",
    description: "Deep cleaning of your car's interior, including seats and carpets",
    price: 89.99,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Standard Home Cleaning",
    category: "home-cleaning",
    description: "Complete cleaning of living areas, kitchen, and bathrooms",
    price: 79.99,
    rating: 4.7,
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Deep Home Cleaning",
    category: "home-cleaning",
    description: "Thorough cleaning of all areas, including hard-to-reach places",
    price: 129.99,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Window Cleaning",
    category: "home-cleaning",
    description: "Professional cleaning of all windows inside and out",
    price: 59.99,
    rating: 4.6,
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Haircut & Styling",
    category: "personal-care",
    description: "Professional haircut and styling by experienced stylists",
    price: 39.99,
    rating: 4.8,
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Massage Therapy",
    category: "personal-care",
    description: "Relaxing full-body massage to relieve stress and tension",
    price: 69.99,
    rating: 4.9,
    image: "/placeholder.svg",
  },
  {
    id: 9,
    name: "Manicure & Pedicure",
    category: "personal-care",
    description: "Complete nail care service for hands and feet",
    price: 49.99,
    rating: 4.7,
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
    
    if (category && ["car-wash", "home-cleaning", "personal-care"].includes(category)) {
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-muted-foreground max-w-3xl">
          Browse our selection of professional services designed to make your life easier and more enjoyable.
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
          <TabsTrigger value="car-wash" className="flex gap-2">
            <Car className="h-4 w-4" />
            Car Wash
          </TabsTrigger>
          <TabsTrigger value="home-cleaning" className="flex gap-2">
            <HomeIcon className="h-4 w-4" />
            Home Cleaning
          </TabsTrigger>
          <TabsTrigger value="personal-care" className="flex gap-2">
            <User className="h-4 w-4" />
            Personal Care
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
