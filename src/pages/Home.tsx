
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Briefcase, Home as HomeIcon, User, ArrowRight, Check, Star } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted overflow-hidden">
        <div className="container py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block">Premium Services</span>
                <span className="text-primary">For Your Lifestyle</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Connect with elite service providers for concierge, home luxury, and professional services - saving you time and enhancing your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="transition-transform hover:scale-105">
                  <Link to="/booking">Book a Service</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="transition-transform hover:scale-105">
                  <Link to="/services">Explore Services</Link>
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
                  alt="Premium Service Provider" 
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
            <h2 className="text-3xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-muted-foreground">
              Choose from our exclusive range of high-quality services designed to save you time and enhance your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard 
              title="Concierge Services"
              description="Personal assistants, priority errands, and VIP access to exclusive events and reservations."
              icon={<Clock className="h-8 w-8" />}
              link="/services?category=concierge"
              imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
              animationDelay="delay-100"
            />
            <ServiceCard 
              title="Home Luxury"
              description="Premium home cleaning, private chef experiences, and smart home setup by certified professionals."
              icon={<HomeIcon className="h-8 w-8" />}
              link="/services?category=home-luxury"
              imageUrl="https://images.unsplash.com/photo-1600585154526-990dced4db3d?auto=format&fit=crop&q=80"
              animationDelay="delay-300"
            />
            <ServiceCard 
              title="Professional Services"
              description="Executive virtual assistants, private fitness training, and personal styling by top professionals."
              icon={<Briefcase className="h-8 w-8" />}
              link="/services?category=professional"
              imageUrl="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&q=80"
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
              description="Browse through our exclusive premium services"
              animationDelay="delay-100"
            />
            <StepCard 
              number={2}
              title="Select a Provider"
              description="Pick from our vetted, elite service professionals"
              animationDelay="delay-200"
            />
            <StepCard 
              number={3}
              title="Schedule Appointment"
              description="Choose a date and time that works with your schedule"
              animationDelay="delay-300"
            />
            <StepCard 
              number={4}
              title="Enjoy the Service"
              description="Relax while our professionals exceed your expectations"
              animationDelay="delay-400"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">
              Hear from clients who have experienced our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard 
              name="Jonathan Williams"
              role="Executive"
              quote="The concierge service is exceptional. My errands are handled quickly and efficiently, saving me valuable time every week."
              rating={5}
              animationDelay="delay-100"
            />
            <TestimonialCard 
              name="Elizabeth Chen"
              role="Business Owner"
              quote="The private chef experience was phenomenal. The meal was exquisite and the service was discreet and professional."
              rating={5}
              animationDelay="delay-300"
            />
            <TestimonialCard 
              name="Michael Reynolds"
              role="Tech Entrepreneur"
              quote="My virtual assistant has transformed how I manage my schedule. Worth every penny for the time it has given back to me."
              rating={5}
              animationDelay="delay-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-scale-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Lifestyle?</h2>
            <p className="mb-8 opacity-90">
              Join our exclusive community of clients who have discovered the luxury of time through our premium services
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
