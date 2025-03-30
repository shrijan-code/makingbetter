
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Car, Home, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Making Better Services
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[800px]">
              Connecting quality service providers with customers for car wash, 
              cleaning, and personal care services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg">
                <Link to="/services">Explore Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Car Wash</h3>
              <p className="text-muted-foreground">
                Professional car washing and detailing services at your convenience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Home Cleaning</h3>
              <p className="text-muted-foreground">
                Comprehensive home cleaning services to keep your living space spotless.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personal Care</h3>
              <p className="text-muted-foreground">
                Quality personal care services delivered by experienced professionals.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">
              Ready to Experience Better Services?
            </h2>
            <p className="text-xl text-muted-foreground max-w-[600px]">
              Book a service today and discover the Making Better difference
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
