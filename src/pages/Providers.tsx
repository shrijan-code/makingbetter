
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Star, Filter, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for providers
const providers = [
  {
    id: 1,
    name: "Jane Smith",
    avatar: "/placeholder.svg",
    services: [1, 2, 3],
    rating: 4.9,
    reviews: 124,
    location: "Downtown, New York",
    verified: true,
    about: "Professional with 5+ years of experience in premium car detailing services.",
  },
  {
    id: 2,
    name: "Michael Johnson",
    avatar: "/placeholder.svg",
    services: [1, 2],
    rating: 4.7,
    reviews: 97,
    location: "Brooklyn, New York",
    verified: true,
    about: "Certified car wash specialist with attention to detail and eco-friendly products.",
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "/placeholder.svg",
    services: [4, 5, 6],
    rating: 4.8,
    reviews: 156,
    location: "Queens, New York",
    verified: true,
    about: "House cleaning expert with a team of trained professionals to handle any home.",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "/placeholder.svg",
    services: [4, 5],
    rating: 4.6,
    reviews: 88,
    location: "Upper East Side, New York",
    verified: true,
    about: "Specialized in deep cleaning for homes and apartments with attention to detail.",
  },
  {
    id: 5,
    name: "Linda Rodriguez",
    avatar: "/placeholder.svg",
    services: [7, 8, 9],
    rating: 4.9,
    reviews: 201,
    location: "Bronx, New York",
    verified: true,
    about: "Licensed cosmetologist with specialty in hair styling and personal care services.",
  },
  {
    id: 6,
    name: "Robert Davis",
    avatar: "/placeholder.svg",
    services: [8, 9],
    rating: 4.8,
    reviews: 112,
    location: "Staten Island, New York",
    verified: true,
    about: "Certified massage therapist with experience in various massage techniques.",
  },
];

// Mock services (linked to the ones in Services.tsx)
const services = [
  { id: 1, name: "Premium Car Wash", category: "car-wash" },
  { id: 2, name: "Quick Car Wash", category: "car-wash" },
  { id: 3, name: "Interior Detailing", category: "car-wash" },
  { id: 4, name: "Standard Home Cleaning", category: "home-cleaning" },
  { id: 5, name: "Deep Home Cleaning", category: "home-cleaning" },
  { id: 6, name: "Window Cleaning", category: "home-cleaning" },
  { id: 7, name: "Haircut & Styling", category: "personal-care" },
  { id: 8, name: "Massage Therapy", category: "personal-care" },
  { id: 9, name: "Manicure & Pedicure", category: "personal-care" },
];

const Providers = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);

  // Parse URL parameters for service filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get("service");
    
    if (serviceId && !isNaN(parseInt(serviceId))) {
      setSelectedService(parseInt(serviceId));
    } else {
      setSelectedService(null);
    }
  }, [location.search]);

  // Filter providers based on search, service, categories, and rating
  useEffect(() => {
    let result = providers;
    
    // Filter by selected service
    if (selectedService) {
      result = result.filter(provider => 
        provider.services.includes(selectedService)
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        provider => 
          provider.name.toLowerCase().includes(query) || 
          provider.location.toLowerCase().includes(query) ||
          provider.about.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(provider => {
        const providerServiceCategories = provider.services.map(
          serviceId => services.find(s => s.id === serviceId)?.category
        );
        return selectedCategories.some(category => 
          providerServiceCategories.includes(category)
        );
      });
    }
    
    // Filter by rating
    if (minRating > 0) {
      result = result.filter(provider => provider.rating >= minRating);
    }
    
    setFilteredProviders(result);
  }, [selectedService, searchQuery, selectedCategories, minRating]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="container py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Providers</h1>
        <p className="text-muted-foreground max-w-3xl">
          Connect with our network of verified professional service providers ready to assist you.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search providers by name or location..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filter Providers</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <h3 className="mb-3 text-sm font-medium">Service Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`mr-2 ${selectedCategories.includes("car-wash") ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => toggleCategory("car-wash")}
                    >
                      {selectedCategories.includes("car-wash") && <Check className="mr-1 h-4 w-4" />}
                      Car Wash
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`mr-2 ${selectedCategories.includes("home-cleaning") ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => toggleCategory("home-cleaning")}
                    >
                      {selectedCategories.includes("home-cleaning") && <Check className="mr-1 h-4 w-4" />}
                      Home Cleaning
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`${selectedCategories.includes("personal-care") ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => toggleCategory("personal-care")}
                    >
                      {selectedCategories.includes("personal-care") && <Check className="mr-1 h-4 w-4" />}
                      Personal Care
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-medium">Minimum Rating</h3>
                <div className="flex items-center gap-2">
                  {[4, 4.5, 4.8].map((rating) => (
                    <Button
                      key={rating}
                      variant="outline"
                      size="sm"
                      className={`${minRating === rating ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    >
                      {minRating === rating && <Check className="mr-1 h-4 w-4" />}
                      {rating}+
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([]);
                    setMinRating(0);
                  }}
                >
                  Reset
                </Button>
                <Button onClick={() => setFiltersOpen(false)}>Apply Filters</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Selected Service Filter */}
      {selectedService && (
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Filtered by service:</p>
            <div className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm">
              {services.find(s => s.id === selectedService)?.name}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1" 
                onClick={() => setSelectedService(null)}
              >
                <span className="sr-only">Remove filter</span>
                ×
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Providers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground mb-4">No providers found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedService(null);
                setSelectedCategories([]);
                setMinRating(0);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProviderCardProps {
  provider: {
    id: number;
    name: string;
    avatar: string;
    services: number[];
    rating: number;
    reviews: number;
    location: string;
    verified: boolean;
    about: string;
  };
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  // Get provider's service names
  const providerServices = provider.services.map(
    serviceId => services.find(s => s.id === serviceId)?.name
  ).filter(Boolean);

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={provider.avatar} 
                alt={provider.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{provider.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="font-medium text-sm mr-1">{provider.rating}</span>
                  <span className="text-muted-foreground text-sm">({provider.reviews} reviews)</span>
                  {provider.verified && (
                    <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="hidden sm:block">
                <Button asChild>
                  <Link to={`/booking?provider=${provider.id}`}>Book Now</Link>
                </Button>
              </div>
            </div>
            
            <div className="mt-3 flex items-start gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground text-sm">{provider.location}</span>
            </div>
            
            <p className="mt-3 text-sm">{provider.about}</p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Available Services:</h4>
              <div className="flex flex-wrap gap-2">
                {providerServices.map((service, index) => (
                  <span 
                    key={index}
                    className="bg-muted text-foreground text-xs px-2 py-1 rounded-md"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 sm:hidden">
              <Button className="w-full" asChild>
                <Link to={`/booking?provider=${provider.id}`}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Providers;
