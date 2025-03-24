
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Home as HomeIcon, User, ArrowRight, Check, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted overflow-hidden">
        <div className="container py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Professional Services</span>
                <span className="text-primary">At Your Doorstep</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with top-rated service providers for car washing, home cleaning, and personal care services - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="transition-transform hover:scale-105">
                  <Link to="/booking">Book a Service</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="transition-transform hover:scale-105">
                  <Link to="/services">Browse Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] hidden md:block animate-scale-in">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[300px] bg-primary/10 rounded-2xl">
                <div className="absolute -top-6 -right-6 w-[120px] h-[120px] bg-primary/20 rounded-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-[160px] h-[160px] bg-primary/15 rounded-xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Service Provider" 
                  className="h-[300px] w-auto object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground">
              Choose from our wide range of professional services designed to make your life easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              title="Car Wash"
              description="Professional car cleaning services for all vehicle types. Interior and exterior options available."
              icon={<Car className="h-8 w-8" />}
              link="/services?category=car-wash"
              imageUrl="https://images.unsplash.com/photo-1552809546-bb5d0ebc907e?auto=format&fit=crop&q=80"
              animationDelay="delay-100"
            />
            <ServiceCard 
              title="Home Cleaning"
              description="Expert house cleaning services from trained professionals, using eco-friendly products."
              icon={<HomeIcon className="h-8 w-8" />}
              link="/services?category=home-cleaning"
              imageUrl="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80"
              animationDelay="delay-300"
            />
            <ServiceCard 
              title="Personal Care"
              description="Self-care services including haircuts, massages, manicures, and more."
              icon={<User className="h-8 w-8" />}
              link="/services?category=personal-care"
              imageUrl="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80"
              animationDelay="delay-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">
              Getting started with MakingBetter is quick and easy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard 
              number={1}
              title="Choose a Service"
              description="Browse through our wide range of professional services"
              animationDelay="delay-100"
            />
            <StepCard 
              number={2}
              title="Select a Provider"
              description="Pick from our vetted, top-rated service professionals"
              animationDelay="delay-200"
            />
            <StepCard 
              number={3}
              title="Schedule Appointment"
              description="Choose a date and time that works best for you"
              animationDelay="delay-300"
            />
            <StepCard 
              number={4}
              title="Enjoy the Service"
              description="Relax while our professionals take care of everything"
              animationDelay="delay-400"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">
              Hear from customers who have experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              name="John Smith"
              role="Car Owner"
              quote="The car wash service was excellent. My car hasn't looked this good since I bought it!"
              rating={5}
              animationDelay="delay-100"
            />
            <TestimonialCard 
              name="Sarah Johnson"
              role="Homeowner"
              quote="The cleaning team was professional, thorough, and finished ahead of schedule. Highly recommend!"
              rating={5}
              animationDelay="delay-300"
            />
            <TestimonialCard 
              name="Michael Brown"
              role="Regular Customer"
              quote="I've tried all their services and have never been disappointed. Their personal care services are the best!"
              rating={4}
              animationDelay="delay-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-scale-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Experience?</h2>
            <p className="mb-8 opacity-90">
              Join thousands of satisfied customers who have simplified their lives with our services
            </p>
            <Button asChild size="lg" variant="secondary" className="transition-transform hover:scale-105">
              <Link to="/booking">Book Your First Service</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  imageUrl: string;
  animationDelay?: string;
}

const ServiceCard = ({ title, description, icon, link, imageUrl, animationDelay }: ServiceCardProps) => {
  return (
    <Card className={`group overflow-hidden transition-all hover:shadow-md animate-fade-in ${animationDelay}`}>
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Link 
          to={link} 
          className="inline-flex items-center text-primary font-medium group-hover:underline"
        >
          View Services 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
};

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  animationDelay?: string;
}

const StepCard = ({ number, title, description, animationDelay }: StepCardProps) => {
  return (
    <div className={`flex flex-col items-center text-center animate-fade-in ${animationDelay}`}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold mb-4 transition-transform hover:scale-110">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  rating: number;
  animationDelay?: string;
}

const TestimonialCard = ({ name, role, quote, rating, animationDelay }: TestimonialCardProps) => {
  return (
    <Card className={`hover:shadow-md transition-all animate-fade-in ${animationDelay}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'fill-primary text-primary' : 'text-muted'}`} 
            />
          ))}
        </div>
        <p className="italic mb-4">"{quote}"</p>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold mr-3">
            {name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Home;
