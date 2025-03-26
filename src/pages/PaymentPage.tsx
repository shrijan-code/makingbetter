
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CreditCard, Calendar, Lock } from 'lucide-react';

// Mock booking data
const mockBooking = {
  id: 'b1',
  service: 'House Cleaning',
  provider: 'Alice Johnson',
  date: '2023-12-05',
  time: '10:00 AM',
  duration: '2 hours',
  price: 120,
  status: 'Completed',
};

// Form schema
const formSchema = z.object({
  cardName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  cardNumber: z.string()
    .min(16, { message: 'Card number must be at least 16 digits.' })
    .max(19, { message: 'Card number cannot exceed 19 digits.' })
    .regex(/^[0-9\s-]+$/, { message: 'Card number can only contain digits, spaces, or hyphens.' }),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { 
      message: 'Expiry date must be in MM/YY format.' 
    }),
  cvc: z.string()
    .length(3, { message: 'CVC must be 3 digits.' })
    .regex(/^\d{3}$/, { message: 'CVC can only contain digits.' }),
});

type PaymentFormValues = z.infer<typeof formSchema>;

const PaymentPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(mockBooking);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
    },
  });
  
  useEffect(() => {
    // In a real app, fetch booking details from Supabase
    // For now, we'll use mock data
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [bookingId]);
  
  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };
  
  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1/$2');
  };
  
  const onSubmit = async (data: PaymentFormValues) => {
    setLoading(true);
    
    try {
      // In a real app, process payment with Stripe or another payment processor
      // For demo, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Payment processed successfully!');
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('There was an error processing your payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container max-w-lg py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Payment</CardTitle>
          <CardDescription>
            Pay for your completed service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Service:</span> {booking.service}</p>
              <p><span className="text-muted-foreground">Provider:</span> {booking.provider}</p>
              <p><span className="text-muted-foreground">Date:</span> {booking.date}, {booking.time}</p>
              <p><span className="text-muted-foreground">Duration:</span> {booking.duration}</p>
              <div className="mt-2 pt-2 border-t flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${booking.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          {...field} 
                          onChange={(e) => {
                            field.onChange(formatCardNumber(e.target.value));
                          }}
                          maxLength={19}
                        />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            onChange={(e) => {
                              field.onChange(formatExpiry(e.target.value));
                            }}
                            maxLength={5}
                          />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="123" 
                            type="text" 
                            inputMode="numeric"
                            {...field} 
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              field.onChange(value);
                            }}
                            maxLength={3}
                          />
                          <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="text-xs text-muted-foreground flex items-center mt-4">
                <Lock className="h-3 w-3 mr-1" />
                Payment information is secure and encrypted
              </div>
              
              <CardFooter className="flex justify-between px-0 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2" disabled={loading}>
                  {loading ? 'Processing...' : `Pay $${booking.price.toFixed(2)}`}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
