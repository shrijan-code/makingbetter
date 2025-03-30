
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: ContactForm = await req.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending email with data:", { name, email, subject, message });

    // Send notification email to site owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Making Better <onboarding@resend.dev>", // You can change this after verifying your domain with Resend
      to: "shrijan.bhandari1318@gmail.com", // Your email where you want to receive contact messages
      subject: `New Contact Form: ${subject}`,
      html: `
        <h1>New message from your website</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send confirmation email to the visitor
    const visitorEmailResponse = await resend.emails.send({
      from: "Making Better <onboarding@resend.dev>", // You can change this after verifying your domain with Resend
      to: email,
      subject: "We've received your message",
      html: `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>For your reference, here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <p>Best regards,<br>The Making Better Team</p>
      `,
    });

    console.log("Email sent successfully:", {
      owner: ownerEmailResponse,
      visitor: visitorEmailResponse,
    });

    return new Response(
      JSON.stringify({
        message: "Emails sent successfully",
        owner: ownerEmailResponse,
        visitor: visitorEmailResponse,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
