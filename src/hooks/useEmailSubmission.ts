
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rlclhjfbbuxwkbbytctb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsY2xoamZiYnV4d2tiYnl0Y3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4NTk3NzgsImV4cCI6MjAyOTQzNTc3OH0.8EqPUFrSJmPXNh8RBqtHohCU5YBOblKLSeDY32aK4O8';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BookingEmailData {
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

  const submitContactEmail = async (data: EmailData) => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase Edge Function to send the email
      const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        }
      });

      if (error) {
        console.error("Error submitting email:", error);
        throw new Error(error.message || "Failed to submit contact email");
      }

      console.log("Email submission successful:", responseData);
      return true;
    } catch (error) {
      console.error("Error submitting email:", error);
      throw new Error("Failed to submit contact email");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitBookingEmail = async (data: BookingEmailData) => {
    setIsSubmitting(true);
    
    try {
      // Call the Supabase Edge Function to send the booking email
      const { data: responseData, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.customerName,
          email: data.customerEmail,
          subject: `Booking Confirmation: ${data.service} on ${data.date}`,
          message: `
Booking Details:
Service: ${data.service} ($${data.servicePrice})
Provider: ${data.provider}
Date: ${data.date}
Time: ${data.time}
Customer Phone: ${data.customerPhone}
Service Address: ${data.customerAddress}
Special Notes: ${data.customerNotes}
          `.trim()
        }
      });

      if (error) {
        console.error("Error submitting booking email:", error);
        throw new Error(error.message || "Failed to submit booking email");
      }

      console.log("Booking email submission successful:", responseData);
      return true;
    } catch (error) {
      console.error("Error submitting booking email:", error);
      throw new Error("Failed to submit booking email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitContactEmail, submitBookingEmail, isSubmitting };
};
