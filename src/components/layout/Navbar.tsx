import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Clock, Briefcase, Home as HomeIcon, User, MessageSquare, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-primary text-primary-foreground p-1 rounded-md">
            <Smartphone className="h-6 w-6" />
          </span>
          <span>MakingBetter</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
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
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <HomeIcon className="mr-2 h-4 w-4" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 w-[300px]">
                  <li className="row-span-3">
                    <Link
                      to="/services"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        All Premium Services
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Browse all our exclusive services
                      </p>
                    </Link>
                  </li>
                  <ServiceItem
                    to="/services?category=concierge"
                    title="Concierge Services"
                    description="Priority errands and personal assistance"
                    icon={<Clock className="h-4 w-4" />}
                  />
                  <ServiceItem
                    to="/services?category=home-luxury"
                    title="Home Luxury"
                    description="Premium home services and experiences"
                    icon={<HomeIcon className="h-4 w-4" />}
                  />
                  <ServiceItem
                    to="/services?category=professional"
                    title="Professional Services"
                    description="Executive and personal expertise"
                    icon={<Briefcase className="h-4 w-4" />}
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/providers">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Providers
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/booking">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Book Now
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <HomeIcon className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link to="/services" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <span>Services</span>
              </Link>
              <Link to="/providers" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <span>Providers</span>
              </Link>
              <Link to="/booking" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <span>Book Now</span>
              </Link>
              <Link to="/contact" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <MessageSquare className="h-4 w-4" />
                <span>Contact</span>
              </Link>
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent" onClick={() => setIsMenuOpen(false)}>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </nav>
          </div>
        )}

        <div className="hidden md:flex items-center gap-4">
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button asChild>
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

interface ServiceItemProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ServiceItem = ({ to, title, description, icon }: ServiceItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div className="flex items-center gap-2 text-sm font-medium leading-none">
          {icon}
          <span>{title}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    </li>
  );
};

export default Navbar;
