
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import EmailSubmissionForm from "@/components/EmailSubmissionForm";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmission = () => {
    setFormSubmitted(true);
    
    // Scroll to top after form submission
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    toast({
      title: "Thank you for contacting us!",
      description: "We will get back to you as soon as possible.",
    });
  };

  return (
    <div className="container max-w-5xl py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Have a question or need assistance? We're here to help! Fill out the form below and our team will get back to you as soon as possible.
        </p>
      </div>

      {formSubmitted ? (
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Message Sent Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you for reaching out. We've received your message and will respond to your inquiry shortly.
          </p>
          <Button onClick={() => setFormSubmitted(false)} variant="outline">
            Send Another Message
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              We'd love to hear from you. Please fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded mr-4">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">shrijan.bhandari1318@gmail.com</p>
                </div>
              </div>
              
              <div className="border-t my-6"></div>
              
              <div>
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                <p className="text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
          
          <div>
            <EmailSubmissionForm 
              recipientEmail="shrijan.bhandari1318@gmail.com" 
              onSubmissionComplete={handleFormSubmission}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
