
import { useState } from "react";

interface EmailData {
  service: string;
  servicePrice: number;
  provider: string;
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerNotes: string;
}

export const useEmailSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBookingEmail = async (data: EmailData) => {
    setIsSubmitting(true);
    
    try {
      // Email submission method 1: Using a service like EmailJS, Formspree, etc.
      // This approach works without a backend server
      const formData = new FormData();
      
      // Add recipient - use your personal email or the hello@makingbetter.online address
      formData.append("to", "hello@makingbetter.online"); // Replace with your personal email if preferred
      
      // Add subject
      formData.append("subject", `New booking request for ${data.service}`);
      
      // Format email body
      const emailBody = `
        New Booking Details:
        
        Service: ${data.service} ($${data.servicePrice.toFixed(2)})
        Provider: ${data.provider}
        Date: ${data.date}
        Time: ${data.time}
        
        Customer Information:
        Name: ${data.customerName}
        Email: ${data.customerEmail}
        Phone: ${data.customerPhone}
        Address: ${data.customerAddress}
        Notes: ${data.customerNotes}
      `;
      
      formData.append("message", emailBody);
      
      // For demonstration, we'll log the data instead of sending it
      // This would be replaced with actual API call in production
      console.log("Email would be sent with data:", data);
      
      // Note: To implement a real email submission, you would need to:
      // 1. Set up an email service (FormSpree, EmailJS, etc.)
      // 2. Replace this section with the appropriate API call
      
      // Simulating successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return true;
    } catch (error) {
      console.error("Error submitting email:", error);
      throw new Error("Failed to submit booking email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitBookingEmail, isSubmitting };
};
