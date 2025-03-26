
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Sample categories
const serviceCategories = [
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'moving', label: 'Moving & Storage' },
  { value: 'tech', label: 'Tech Support' },
  { value: 'other', label: 'Other' },
];

// Form schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Service title must be at least 3 characters.',
  }),
  category: z.string({
    required_error: 'Please select a category.',
  }),
  description: z.string().min(20, {
    message: 'Description must be at least 20 characters.',
  }),
  price: z.coerce.number().positive({
    message: 'Price must be a positive number.',
  }),
  duration: z.coerce.number().int().positive({
    message: 'Duration must be a positive number.',
  }),
  location: z.string().min(3, {
    message: 'Location must be at least 3 characters.',
  }),
});

type ServiceFormValues = z.infer<typeof formSchema>;

// Mock service data (would come from Supabase in a real app)
const mockService = {
  id: 's1',
  title: 'Basic Plumbing',
  category: 'plumbing',
  description: 'Professional plumbing services for small repairs and installations.',
  price: 75,
  duration: 60,
  location: 'Melbourne, VIC',
};

const ServiceForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Setup form with default values
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      description: '',
      price: 0,
      duration: 60,
      location: '',
    },
  });
  
  // Load service data if editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch from Supabase
      // Here we'll use mock data
      setLoading(true);
      setTimeout(() => {
        form.reset({
          title: mockService.title,
          category: mockService.category,
          description: mockService.description,
          price: mockService.price,
          duration: mockService.duration,
          location: mockService.location,
        });
        setLoading(false);
      }, 500);
    }
  }, [isEditing, form]);
  
  const onSubmit = async (data: ServiceFormValues) => {
    setLoading(true);
    
    try {
      // In a real app, save to Supabase
      // For demo, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(
        isEditing 
          ? 'Service updated successfully!' 
          : 'Service created successfully!'
      );
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('There was an error saving your service. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Service' : 'Create New Service'}</CardTitle>
        <CardDescription>
          {isEditing 
            ? 'Update your service details below' 
            : 'Fill in the details to list your new service'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Professional House Cleaning" {...field} />
                  </FormControl>
                  <FormDescription>
                    A concise title that describes your service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the category that best fits your service
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your service in detail..." 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Include what clients can expect, your experience, and any requirements
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormDescription>
                      Set your service price in AUD
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="15" step="15" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimated time to complete the service
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Melbourne, VIC" {...field} />
                  </FormControl>
                  <FormDescription>
                    Where you offer this service (city, region, etc.)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Separator />
            
            <CardFooter className="flex justify-between px-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : isEditing ? 'Update Service' : 'Create Service'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
