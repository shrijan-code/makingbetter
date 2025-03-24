
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="inline-block bg-primary text-primary-foreground p-1 rounded-md">MB</span>
              MakingBetter
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
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>3/27 Crisp Circuit, Bruce ACT 2617</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>0452 081 226</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@makingbetter.com.au</span>
              </li>
              <li className="pt-2 flex items-center gap-4">
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MakingBetter. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
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
