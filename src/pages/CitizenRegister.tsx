import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const citizenSchema = z.object({
  nin_id: z.string().trim().min(11, 'NIN must be at least 11 characters').max(11, 'NIN must be exactly 11 characters'),
  first_name: z.string().trim().min(1, 'First name is required').max(100, 'First name is too long'),
  last_name: z.string().trim().min(1, 'Last name is required').max(100, 'Last name is too long'),
  dob: z.string().min(1, 'Date of birth is required'),
  current_address: z.string().trim().max(500, 'Address is too long').optional(),
  original_lga: z.string().trim().max(200, 'LGA name is too long').optional(),
});

export default function CitizenRegister() {
  const [formData, setFormData] = useState({
    nin_id: '',
    first_name: '',
    last_name: '',
    dob: '',
    current_address: '',
    original_lga: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = citizenSchema.parse(formData);
      
      setIsLoading(true);
      const insertData = {
        nin_id: validated.nin_id,
        first_name: validated.first_name,
        last_name: validated.last_name,
        dob: validated.dob,
        current_address: validated.current_address || null,
        original_lga: validated.original_lga || null,
      };
      
      const { error } = await supabase
        .from('citizens')
        .insert([insertData]);

      if (error) throw error;

      toast({
        title: 'Registration Successful',
        description: `Citizen ${validated.first_name} ${validated.last_name} has been registered.`,
      });

      setFormData({
        nin_id: '',
        first_name: '',
        last_name: '',
        dob: '',
        current_address: '',
        original_lga: '',
      });

      navigate('/staff/portal');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({
          variant: 'destructive',
          title: 'Validation Error',
          description: error.errors[0].message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: error.message || 'An error occurred during registration.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-foreground">LGA-Connect Staff Portal</h1>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <CardTitle className="text-2xl">Citizen Registration</CardTitle>
            <CardDescription>Register a new citizen in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nin_id">NIN ID *</Label>
                  <Input
                    id="nin_id"
                    name="nin_id"
                    placeholder="12345678901"
                    value={formData.nin_id}
                    onChange={handleChange}
                    maxLength={11}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current_address">Current Address</Label>
                <Input
                  id="current_address"
                  name="current_address"
                  placeholder="123 Main Street, City"
                  value={formData.current_address}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="original_lga">Original LGA</Label>
                <Input
                  id="original_lga"
                  name="original_lga"
                  placeholder="Local Government Area"
                  value={formData.original_lga}
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Registering...' : 'Register Citizen'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/staff/portal')}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
