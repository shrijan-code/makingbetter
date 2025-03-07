
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="inline-block bg-primary text-primary-foreground p-1 rounded-md">SC</span>
              ServeConnect
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Connecting you with top-quality service providers for car wash, home cleaning, and personal care needs.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/providers">Providers</FooterLink>
              <FooterLink to="/booking">Book Now</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <FooterLink to="/services?category=car-wash">Car Wash</FooterLink>
              <FooterLink to="/services?category=home-cleaning">Home Cleaning</FooterLink>
              <FooterLink to="/services?category=personal-care">Personal Care</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hello@serveconnect.com</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-2 flex items-center gap-4">
                <a href="#" className="text-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
                <a href="#" className="text-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                <a href="#" className="text-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
                <a href="#" className="text-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ServeConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;
